const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuthenticated } = require("../middleware/auth");
const fileController = require("../controllers/fileController");

// Route to upload a file
router.post(
  "/:folderId/upload",
  ensureAuthenticated,
  upload.single("file"),
  fileController.uploadFile
);

// Move file
router.post(
  "/:fileId/move/:selectedId",
  ensureAuthenticated,
  fileController.moveFile
);

// Delete file
router.post(
  "/:id/delete/:selectedId",
  ensureAuthenticated,
  fileController.deleteFile
);

module.exports = router;
