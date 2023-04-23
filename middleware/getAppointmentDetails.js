const Appointment = require("../handler/models.js").Appointment;

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.getAppointmentDetails = async (req, res) => {
  const { appointment_id } = req.body;

  const appointment = await Appointment.findOne({
    _id: appointment_id,
  })
    .exec()
    .then((r) => r)
    .catch(() => false);

  if (appointment) {
    return res.status(200).json(msgHandler.pass(appointment));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }
};
