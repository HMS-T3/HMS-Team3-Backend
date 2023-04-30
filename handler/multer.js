const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // specify the filename
  },
});

const fileFilter = function (req, file, cb) {
  // only accept jpeg, png, and gif files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage, // specify the storage engine to use
  fileFilter: fileFilter, // specify the file filter function
  limits: {
    // fileSize: 1024 * 1024, // specify the maximum file size in bytes
  },
});

module.exports = upload;
