const User = require("../schemas/User");
const Appointment = require("../schemas/Appointment");
const Availability = require("../schemas/Availability");
const Prescription = require("../schemas/Prescription");
// const Healthrecord = require("../schemas/Healthrecord");

const models = {
  User: User,
  Appointment: Appointment,
  Availability: Availability,
  Prescription: Prescription,
  // Healthrecord: Healthrecord,
};

module.exports = models;
