const home = require("../middleware/home");
const login = require("../middleware/login");
const register = require("../middleware/register");
const bookAppointment = require("../middleware/bookAppointments");
const getUserDetails = require("../middleware/getUserDetails");
const updateUserprofile = require("../middleware/updateUserProfile");
const getAppointmentDetails = require("../middleware/getAppointmentDetails");
const getScheduleDetails = require("../middleware/getScheduleDetails");
const middleware = {
  home: home.home,
  login_patient: login.patient,
  login_staff: login.staff,
  register_patient: register.patient,
  register_staff: register.staff,
  book_appointment: bookAppointment.bookAppointment,
  get_userDetails: getUserDetails.getUserDetails,
  update_user_profile: updateUserprofile.updateUserprofile,
  get_appointment_details: getAppointmentDetails.getAppointmentDetails,
  get_schedule_details: getScheduleDetails.getScheduleDetails,
};

module.exports = middleware;
