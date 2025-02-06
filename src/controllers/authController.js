const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

// Render login page
const renderLoginPage = (req, res) => {
  res.render("auth/login", {
    email: req.query.email || "",
    password: req.query.password || "",
  });
};

// Render register page
const renderRegisterPage = (req, res) => {
  res.render("auth/register");
};

// Handle registration logic
const handleRegistration = async (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      req.flash(
        "error_msg",
        `Email '${email}' already exists. You can log in with the email.`
      );
      return res.redirect(`/auth/login?email=${encodeURIComponent(email)}`);
    }

    // Hash the password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await tx.folder.create({
        data: {
          name: "Home",
          type: "ROOT",
          userId: user.id,
        },
      });

      return user;
    });

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "Registration Successful!");
      return res.redirect("/dashboard/home"); // Redirect to dashboard after login
    });
  } catch (error) {
    req.flash("error_msg", "Error creating user.");
    res.redirect("/auth/register");
  }
};

// Handle logout logic
const handleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const deleteFilesForUser = async (userId) => {
  // Find all folders belonging to the user
  const userFolders = await prisma.folder.findMany({
    where: { userId },
    select: { id: true },
  });

  // Collect all file IDs from user's folders
  for (const folder of userFolders) {
    const files = await prisma.file.findMany({
      where: { folderId: folder.id },
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
  }
};

const handleAccountDeletion = async (req, res) => {
  const userId = req.user.id;

  try {
    await deleteFilesForUser(userId);
    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    req.logout(() => {
      req.flash("success_msg", "Account deleted successfully!");
      res.redirect("/");
    });
  } catch (error) {
    req.flash("error_msg", "An error occured while deleting your account.");
    res.redirect("/dashboard");
  }
};

module.exports = {
  renderLoginPage,
  renderRegisterPage,
  handleRegistration,
  handleLogout,
  handleAccountDeletion,
};
