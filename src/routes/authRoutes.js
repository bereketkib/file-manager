const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

// Render login page
router.get("/login", authController.renderLoginPage);

// Handle login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard/home", // Redirect on success
    failureRedirect: "/auth/login", // Redirect on failure
    failureFlash: true, // Enable flash messages
  })
);

// Render register page
router.get("/register", authController.renderRegisterPage);

// Handle registration
router.post("/register", authController.handleRegistration);

// Handle logout
router.get("/logout", ensureAuthenticated, authController.handleLogout);

// Handle account deletion
router.post(
  "/delete-account",
  ensureAuthenticated,
  authController.handleAccountDeletion
);

module.exports = router;
