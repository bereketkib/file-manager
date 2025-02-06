const prisma = require("../utils/prisma");

exports.getDashboard = async (req, res) => {
  const folder = req.params.folder;
  const name = req.user.name.split(" ")[0];
  const userId = req.user.id;

  try {
    const allFolders = await prisma.folder.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: { id: "asc" },
    });

    const home = await prisma.folder.findFirst({
      where: {
        userId: userId,
        type: "ROOT",
      },
      include: {
        children: true,
        files: true,
      },
    });

    let selectedFolder = null;

    if (folder === "home") {
      selectedFolder = home;
    } else {
      const folderId = Number(folder);
      selectedFolder = await prisma.folder.findUnique({
        where: {
          id: folderId,
        },
        include: {
          children: true,
          files: true,
        },
      });
      if (!selectedFolder) {
        selectedFolder = home;
      }
    }

    let folderTree = [];
    let activeFolder = selectedFolder;

    while (activeFolder) {
      // Add current folder at the beginning of the array
      folderTree.unshift(activeFolder);

      // Fetch the parent folder if it exists
      if (activeFolder.parentId) {
        activeFolder = await prisma.folder.findUnique({
          where: { id: activeFolder.parentId },
        });
      } else {
        activeFolder = null; // Stop when there is no parent
      }
    }

    res.render("dashboard", {
      email: req.user.email,
      name,
      home: home,
      selectedFolder,
      folderTree,
      allFolders,
    });
  } catch (error) {
    req.flash("error_msg", "Error rendering dashboard");
    res.redirect("/");
  }
};
