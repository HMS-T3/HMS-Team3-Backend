module.exports.app = {
  root: "/",
  loginPatient: "/login/patient",
  loginStaff: "/login/staff",
  registerStaff: "/register/staff",
  registerPatient: "/register/patient",
  book_appointment: "/book_appointment/patient",
  get_userDetails: "/getUserDetails",
  update_user_profile: "/update_user_profile/patient",
  get_appointment_details: "/get_appointment_details",
  get_schedule_details: "/get_schedule_details",
  getSpecialization: "/get_specializations",
  getDoctors: "/get_doctors",
  upload: "/upload",
  addAvailability: "/addAvailability",
  dropTable: "/dropTable",
  updateSOSContacts: "/updateSOSContacts",
  getSOSContacts: "/getSOSContacts",
  getAvailableTimeSlots: "/getAvailableTimeSlots", 
  search: "/search"
};

module.exports.test = {
  addUsers: "/addUsers",
  getTimeSlots: "/getTimeSlots",
};
