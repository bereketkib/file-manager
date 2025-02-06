const express = require("express");
const { ensureAuthenticated } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

// Render Dashoard
router.get("/:folder", ensureAuthenticated, dashboardController.getDashboard);

module.exports = router;
