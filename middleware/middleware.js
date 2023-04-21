const home = require("./home");
const login = require("./login");
const register = require("./register");
const bookAppointment = require("./bookAppointments");
const getUserDetails = require("./getUserDetails");
const updateUserprofile = require("./updateUserProfile");

const middleware = {
  home: home.home,
  login_patient: login.patient,
  login_staff: login.staff,
  register_patient: register.patient,
  register_staff: register.staff,
  book_appointment: bookAppointment.bookAppointment,
  get_userDetails: getUserDetails.getUserDetails,
  update_user_profile: updateUserprofile.updateUserprofile
};

module.exports = middleware;
