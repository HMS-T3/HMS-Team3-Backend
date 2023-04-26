const express = require("express");
const router = express.Router();
const middleware = require("../handler/middleware");
const routes = require("./routes");
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

router
  //get
  .get(routes.root, middleware.home)
  .get(routes.get_userDetails, middleware.get_userDetails)
  .get(routes.get_appointment_details, middleware.get_appointment_details)
  .get(routes.get_schedule_details, middleware.get_schedule_details)
  .get(routes.getSpecialization, middleware.getSpecialization)
  .get(routes.getDoctors, middleware.getDoctors)
  .get(routes.test, middleware.test)
  //post
  .post(routes.upload, upload.single("file"), middleware.upload)
  .post(routes.loginPatient, middleware.login_patient)
  .post(routes.loginStaff, middleware.login_staff)
  .post(routes.registerStaff, middleware.register_staff)
  .post(routes.registerPatient, middleware.register_patient)
  .post(routes.book_appointment, middleware.book_appointment)
  .post(routes.update_user_profile, middleware.update_user_profile);
module.exports.app = router;
