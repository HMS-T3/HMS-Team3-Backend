const User = require("../models.js").User;
const Appointment = require("../models.js").Appointment;
const enums = require("../enums/enum");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
module.exports.bookAppointment = async (req, res) => {
  const { patient, doctor, reason, whenDate } = req.body;
};
