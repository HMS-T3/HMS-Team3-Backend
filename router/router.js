const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const routes = require("./routes");
var path = require("path");

// //get routes
// router.get(routes.root, middleware.home);

//post routes
router
  .post(routes.loginPatient, middleware.login_patient)
  .post(routes.loginDoctor, middleware.login_doctor)
  .post(routes.registerStaff, middleware.register_staff)
  .post(routes.registerPatient, middleware.register_patient);

module.exports.app = router;
