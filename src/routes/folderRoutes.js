const express = require("express");
const { ensureAuthenticated } = require("../middleware/auth");
const folderController = require("../controllers/folderController");

const router = express.Router();

// Create New Folder
router.post(
  "/:folderId/create",
  ensureAuthenticated,
  folderController.createFolder
);

// Rename Folder
router.post(
  "/:id/rename/:selectedId",
  ensureAuthenticated,
  folderController.renameFolder
);

// Move Folder
router.post(
  "/:folderId/move/:selectedId",
  ensureAuthenticated,
  folderController.moveFolder
);

// Delete folder
router.post(
  "/:id/delete/:selectedId",
  ensureAuthenticated,
  folderController.deleteFolder
);

module.exports = router;
