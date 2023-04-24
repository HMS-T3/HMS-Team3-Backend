const express = require("express");
const router = express.Router();
const middleware = require("../handler/middleware");
const routes = require("./routes");

router
  //get
  .get(routes.root, middleware.home)
  .get(routes.get_userDetails, middleware.get_userDetails)
  .get(routes.get_appointment_details, middleware.get_appointment_details)
  .get(routes.getSpecialization, middleware.getSpecialization)
  //post
  .post(routes.loginPatient, middleware.login_patient)
  .post(routes.loginStaff, middleware.login_staff)
  .post(routes.registerStaff, middleware.register_staff)
  .post(routes.registerPatient, middleware.register_patient)
  .post(routes.book_appointment, middleware.book_appointment)
  .post(routes.update_user_profile, middleware.update_user_profile);
module.exports.app = router;
