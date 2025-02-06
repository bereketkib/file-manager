const prisma = require("../utils/prisma");
const cloudinary = require("cloudinary").v2;

exports.createFolder = async (req, res) => {
  const parentId = Number(req.params.folderId);
  const name = req.body.name;
  const userId = req.user.id;

  try {
    await prisma.folder.create({
      data: {
        name: name,
        parentId: parentId,
        userId: userId,
      },
    });
    req.flash("success_msg", `Folder created successfully!`);
    res.redirect(`/dashboard/${parentId}`);
  } catch (error) {
    req.flash("error_msg", "Error creating Folder.");
    res.redirect(`/dashboard/${parentId}`);
  }
};

exports.renameFolder = async (req, res) => {
  const name = req.body.name;
  const folderId = Number(req.params.id);
  const selectedId = Number(req.params.selectedId);

  try {
    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: name,
      },
    });
    req.flash("success_msg", `Folder updated successfully!`);
    res.redirect(`/dashboard/${selectedId}`);
  } catch (error) {
    req.flash("error_msg", "Error updating Folder.");
    res.redirect(`/dashboard/${selectedId}`);
  }
};

const checkIfFolderIsDescendant = async (folderId, targetParentId) => {
  if (folderId === targetParentId) {
    return true;
  }

  let parent = await prisma.folder.findUnique({
    where: { id: targetParentId },
    select: { parentId: true },
  });

  while (parent && parent.parentId !== null) {
    // Ensure parent.parentId is not null
    if (parent.parentId === folderId) {
      return true;
    }

    // Fetch the next parent folder, but only if parent.parentId is not null
    parent = parent.parentId
      ? await prisma.folder.findUnique({
          where: { id: parent.parentId },
          select: { parentId: true },
        })
      : null;
  }

  return false;
};

exports.moveFolder = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const selectedId = Number(req.params.selectedId);
  const targetParentId = Number(req.body.targetFolderId);

  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (folder.parentId === targetParentId) {
      req.flash("error_msg", "Folder is already inside the target Folder.");
      return res.redirect(`/dashboard/${selectedId}`);
    }
    // Check if the target parent folder exists
    const targetFolder = await prisma.folder.findUnique({
      where: { id: targetParentId },
    });

    if (!targetFolder) {
      req.flash("error_msg", "Target folder does not exist.");
      return res.redirect(`/dashboard/${selectedId}`);
    }

    // Prevent moving a folder inside itself or its own subfolders
    const isChild = await checkIfFolderIsDescendant(folderId, targetParentId);
    if (isChild) {
      req.flash(
        "error_msg",
        "Cannot move a folder into itself or its subfolder."
      );
      return res.redirect(`/dashboard/${selectedId}`);
    }

    // Update folder's parentId (moving it)
    await prisma.folder.update({
      where: { id: folderId },
      data: { parentId: targetParentId },
    });

    req.flash("success_msg", "Folder moved successfully!");
    res.redirect(`/dashboard/${selectedId}`);
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Failed to move folder.");
    res.redirect(`/dashboard/${selectedId}`);
  }
};

const deleteFilesInFolder = async (folderId) => {
  // Find all files in this folder
  const files = await prisma.file.findMany({
    where: { folderId },
  });

  // Delete each file from the filesystem
  for (const file of files) {
    const filePath = new URL(file.url).pathname;
    const fileName = filePath
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
      .replace(/%20/g, " ");

    const publicId = `uploads/${fileName}`;

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(publicId);
  }

  // Find all subfolders of this folder
  const subfolders = await prisma.folder.findMany({
    where: { parentId: folderId },
    select: { id: true },
  });

  // Recursively delete files in subfolders
  for (const subfolder of subfolders) {
    await deleteFilesInFolder(subfolder.id);
  }
};

exports.deleteFolder = async (req, res) => {
  const folderId = Number(req.params.id);
  const selectedId = Number(req.params.selectedId);

  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (folder.type === "ROOT") {
      req.flash("error_msg", "Root folder cannot be deleted!");
      res.redirect(`/dashboard/${selectedId}`);
    }
    // Recursively delete all files in this folder and subfolders
    await deleteFilesInFolder(folderId);

    // Delete the folder (Prisma will cascade delete subfolders)
    await prisma.folder.delete({
      where: { id: folderId },
    });

    req.flash("success_msg", "Folder deleted successfully!");
    res.redirect(`/dashboard/${selectedId}`);
  } catch (error) {
    console.error("Error deleting folder:", error);
    req.flash("error_msg", "Error deleting folder.");
    res.redirect(`/dashboard/${selectedId}`);
  }
};
