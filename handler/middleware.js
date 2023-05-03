const home = require("../middleware/home");
const login = require("../middleware/login");
const register = require("../middleware/register");
const bookAppointment = require("../middleware/bookAppointments");
const getUserDetails = require("../middleware/getUserDetails");
const updateUserprofile = require("../middleware/updateUserProfile");
const getAppointmentDetails = require("../middleware/getAppointmentDetails");
const getScheduleDetails = require("../middleware/getScheduleDetails");
const getSpecialization = require("../middleware/getSpecilzation");
const getDoctors = require("../middleware/getDoctors");
const upload = require("../middleware/upload");
const addAvailability = require("../middleware/addAvailability");
const dropTable = require("../middleware/dropTable");
const updateSOSContacts = require("../middleware/updateSOSContacts");
const getSOSContacts = require("../middleware/getSOSContacts");
const getAvailableTimeSlots = require("../middleware/getAvailableTimeSlots");
const search = require("../middleware/search");
const getScheduleDetailsForADay = require("../middleware/getScheduleDetailsForADay");
const addBulkAvailability = require("../middleware/addBulkAvailability");

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
  getSpecialization: getSpecialization.getSpecialization,
  getDoctors: getDoctors.getDoctors,
  upload: upload.upload,
  addAvailability: addAvailability.addAvailability,
  dropTable: dropTable.dropTable,
  updateSOSContacts: updateSOSContacts.updateSOSContacts,
  getSOSContacts: getSOSContacts.getSOSContacts,
  getAvailableTimeSlots: getAvailableTimeSlots.getAvailableTimeSlots,
  search: search.search,
  getScheduleDetailsForADay: getScheduleDetailsForADay.getScheduleDetailsForADay,
  addBulkAvailability: addBulkAvailability.addBulkAvailability,
};

module.exports = middleware;
