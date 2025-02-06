const prisma = require("../utils/prisma");
const cloudinary = require("cloudinary").v2;

exports.uploadFile = async (req, res) => {
  const folderId = Number(req.params.folderId);
  if (!req.file) {
    req.flash("error_msg", "Please upload a file.");
    return res.redirect(`/dashboard/${folderId}`);
  }

  try {
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        url: req.file.path, // Cloudinary provides a direct URL
        folderId: folderId,
        size: req.file.size,
      },
    });

    req.flash("success_msg", "File uploaded successfully!");
    res.redirect(`/dashboard/${folderId}`);
  } catch (error) {
    console.error(error);
    console.error(error);
    req.flash("error_msg", "Failed to upload file.");
    res.redirect(`/dashboard/${folderId}`);
  }
};

exports.moveFile = async (req, res) => {
  const fileId = Number(req.params.fileId);
  const selectedId = Number(req.params.selectedId);
  const targetParentId = Number(req.body.targetFolderId);

  try {
    const folder = await prisma.folder.findUnique({
      where: { id: targetParentId },
    });

    if (!folder.parentId) {
      req.flash(
        "error_msg",
        "Files cannot be moved into the Root Folder Home."
      );
      return res.redirect(`/dashboard/${selectedId}`);
    }

    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (file.folderId === targetParentId) {
      req.flash("error_msg", "File is already inside the target Folder.");
      return res.redirect(`/dashboard/${selectedId}`);
    }

    await prisma.file.update({
      where: { id: fileId },
      data: { folderId: targetParentId },
    });

    req.flash("success_msg", "File moved successfully!");
    res.redirect(`/dashboard/${selectedId}`);
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error moving File.");
    return res.redirect(`/dashboard/${selectedId}`);
  }
};

exports.deleteFile = async (req, res) => {
  const fileId = Number(req.params.id);
  const selectedId = Number(req.params.selectedId);

  try {
    // Retrieve the file data from the database
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      req.flash("error_msg", "File not found.");
      return res.redirect(`/dashboard/${selectedId}`);
    }

    // Extract Cloudinary public_id from the URL
    const filePath = new URL(file.url).pathname;
    const fileName = filePath
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
      .replace(/%20/g, " ");

    const publicId = `uploads/${fileName}`;

    // Delete file from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);
    console.log("cloudinaryResponse: ", cloudinaryResponse);

    if (cloudinaryResponse.result !== "ok") {
      throw new Error("Failed to delete file from Cloudinary.");
    }

    // Delete file record from the database
    await prisma.file.delete({
      where: { id: fileId },
    });

    req.flash("success_msg", "File deleted successfully!");
    res.redirect(`/dashboard/${selectedId}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    req.flash("error_msg", "Error deleting file.");
    res.redirect(`/dashboard/${selectedId}`);
  }
};
