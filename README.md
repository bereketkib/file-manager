# 📂 Express File Manager

An elegant and powerful **File Manager** built with **Express.js, Prisma ORM, Supabase PostgreSQL, and Cloudinary**. Users can **create, delete, move, and rename** files and folders, upload files to the cloud, and share public URLs for access.

## 🚀 Features

- ✅ User authentication (Sign up, Login, Logout) using **Passport.js**
- 📁 Create, delete, rename folders
- 📄 Create, delete, move files between folders
- ☁️ Upload files to **Cloudinary**
- 🔗 Share public URLs for files
- 🗃️ Organized folder structure for better usability

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Supabase PostgreSQL
- **ORM:** Prisma
- **Authentication:** Passport.js
- **Storage:** Cloudinary for file uploads
- **View Engine:** EJS (for rendering views)
- **Styling:** Tailwind CSS

## 📂 Project Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── prisma
│   └── schema.prisma
├── public
│   ├── css
│   │   ├── output.css
│   │   └── styles.css
│   ├── images
│   │   ├── home.jpeg
│   │   ├── login.jpeg
│   │   ├── logo-white.png
│   │   ├── logo.png
│   │   └── register.jpeg
│   └── js
│       ├── alert.js
│       ├── details.js
│       ├── header.js
│       ├── list.js
│       └── password.js
├── src
│   ├── app.js
│   ├── config.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── fileController.js
│   │   └── folderController.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── multer.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── fileRoutes.js
│   │   └── folderRoutes.js
│   ├── utils
│   │   └── prisma.js
│   └── views
│       ├── auth
│       │   ├── login.ejs
│       │   └── register.ejs
│       ├── dashboard.ejs
│       ├── index.ejs
│       └── partials
│           ├── details.ejs
│           ├── files.ejs
│           ├── folders.ejs
│           ├── header.ejs
│           └── list.ejs
└── tailwind.config.js
```

## ⚡ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/express-file-manager.git
   cd express-file-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up **.env** file:
   ```sh
   DATABASE_URL="your_supabase_database_url"
   DIRECT_URL="your_direct_database_url"
   CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   SESSION_SECRET="your_secret_key"
   ```
4. Run Prisma migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```sh
   npm start
   ```
   The app runs on `http://localhost:3000`

## 🔑 Authentication

- **Sign up & Login** using bcrypt for password hashing.
- Sessions handled with **express-session**.
- Authenticated users can manage files and folders.

## ☁️ Cloud Storage

- Files are uploaded to **Cloudinary**.
- Each uploaded file gets a **public URL** for sharing.

## 📌 API Endpoints

| Method | Endpoint                          | Description                   |
| ------ | --------------------------------- | ----------------------------- |
| POST   | `/auth/register`                  | Register a new user           |
| POST   | `/auth/login`                     | Login user                    |
| GET    | `/auth/logout`                    | Logout user                   |
| POST   | `/folders/:folderId/create`       | Create a new folder           |
| POST   | `/folders/:id/rename/:selectedId` | Rename a folder               |
| POST   | `/folders/:id/delete/:selectedId` | Delete a folder               |
| POST   | `/files/:folderId/upload`         | Upload a file to a folder     |
| POST   | `/files/:id/delete/:selectedId`   | Delete a file                 |
| POST   | `/files/:fileId/move/:selectedId` | Move a file to another folder |

## 📜 Route Details

### Authentication Routes

- **POST** `/auth/register` - Registers a new user.
- **POST** `/auth/login` - Logs in the user and redirects to the dashboard.
- **GET** `/auth/logout` - Logs out the user and redirects to the login page.

### Folder Routes

- **POST** `/folders/:folderId/create` - Creates a new folder inside the specified parent folder.
- **POST** `/folders/:id/rename/:selectedId` - Renames a folder.
- **POST** `/folders/:id/delete/:selectedId` - Deletes a folder.

### File Routes

- **POST** `/files/:folderId/upload` - Uploads a file to the specified folder.
- **POST** `/files/:id/delete/:selectedId` - Deletes a file from the specified folder.
- **POST** `/files/:fileId/move/:selectedId` - Moves a file from one folder to another.

## 🛠️ Middleware and Helpers

- **Passport.js**: Handles user authentication and session management.
- **Multer**: Middleware for handling file uploads.
- **Flash Messages**: Provides feedback for successful or failed operations (e.g., login failure, successful file upload).

## 🧑‍💻 Authentication & Authorization

All endpoints (except for registration and login) require the user to be authenticated. The `ensureAuthenticated` middleware ensures the user is logged in before accessing protected routes.

## 🎨 UI & Design

- Fully responsive design using **Tailwind CSS**.
- Smooth animations for file/folder interactions.
- **EJS templates** used for rendering views.

## 📜 License

MIT License © 2025 Bereket Kibreab Jenay

## 📅 Changelog

- **v1.0**: Initial release with basic authentication and file management functionality.

---

🚀 **Happy Coding!** 😊
