const express = require("express");
const router = express.Router();
const middleware = require("../handler/middleware");
const routes = require("./routes");
const upload = require("../handler/multer");

router
  //get
  .get(routes.root, middleware.home)
  .get(routes.get_userDetails, middleware.get_userDetails)
  .get(routes.get_appointment_details, middleware.get_appointment_details)
  .get(routes.get_schedule_details, middleware.get_schedule_details)
  .get(routes.getSpecialization, middleware.getSpecialization)
  .get(routes.getDoctors, middleware.getDoctors)
  .get(routes.test, middleware.test)
  .get(routes.dropTable, middleware.dropTable)
  //post
  .post(routes.upload, upload.single("file"), middleware.upload)
  .post(routes.loginPatient, middleware.login_patient)
  .post(routes.loginStaff, middleware.login_staff)
  .post(routes.registerStaff, middleware.register_staff)
  .post(routes.registerPatient, middleware.register_patient)
  .post(routes.book_appointment, middleware.book_appointment)
  .post(routes.update_user_profile, middleware.update_user_profile)
  .post(routes.addAvailability, middleware.addAvailability)
  .post(routes.updateSOSContacts, middleware.updateSOSContacts);
module.exports.app = router;
