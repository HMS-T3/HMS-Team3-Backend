const express = require("express");
const router = express.Router();
const testrouter = express.Router();
const middleware = require("../handler/middleware");
const routes = require("./routes").app;
const upload = require("../handler/multer");

const testRoutes = require("./routes").test;
const testMiddleware = require("../test/middleware");

router
  //get
  .get(routes.root, middleware.home)
  .get(routes.get_userDetails, middleware.get_userDetails)
  .get(routes.get_appointment_details, middleware.get_appointment_details)
  .get(routes.get_schedule_details, middleware.get_schedule_details)
  .get(routes.getSpecialization, middleware.getSpecialization)
  .get(routes.getMedicine, middleware.getMedicine)
  .get(routes.getDoctors, middleware.getDoctors)
  .get(routes.dropTable, middleware.dropTable)
  .get(routes.getSOSContacts, middleware.getSOSContacts)
  .get(routes.getAvailableTimeSlots, middleware.getAvailableTimeSlots)
  .get(routes.search, middleware.search)
  .get(routes.getScheduleDetailsForADay, middleware.getScheduleDetailsForADay)
  .get(routes.addBulkAvailability, middleware.addBulkAvailability)
  .get(routes.getLabtests, middleware.getLabTests)
  //post
  .post(routes.upload, upload.single("file"), middleware.upload)
  .post(routes.loginPatient, middleware.login_patient)
  .post(routes.loginStaff, middleware.login_staff)
  .post(routes.registerStaff, middleware.register_staff)
  .post(routes.registerPatient, middleware.register_patient)
  .post(routes.book_appointment, middleware.book_appointment)
  .post(routes.update_user_profile, middleware.update_user_profile)
  .post(routes.addAvailability, middleware.addAvailability)
  .post(routes.updateSOSContacts, middleware.updateSOSContacts)
  .post(routes.makeChatTrue, middleware.makeChatTrue);

testrouter
  .get(testRoutes.addUsers, testMiddleware.addUsers)
  .get(testRoutes.getTimeSlots, testMiddleware.getTimeSlots);

module.exports.app = router;
module.exports.test = testrouter;
