const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { configureSession } = require("./config");
const { initializePassport } = require("./middleware/auth");
const prisma = require("./utils/prisma");
const flash = require("connect-flash");

//Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Configure session
configureSession(app, prisma);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Initialize Passport
initializePassport(app);

// Route path
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/folders", folderRoutes);
app.use("/files", fileRoutes);

// Default route path
app.get("/", (req, res) => {
  res.render("index");
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
