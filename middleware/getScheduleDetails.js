const Appointment = require("../handler/models.js").Appointment;

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.getScheduleDetails = async (req, res) => {
  const { schedule_id} = req.query;

  const schedule = await Appointment.findOne({
    _id: schedule_id,
  })
    .populate(schedule._id, "doctor")
    .populate("patient")
    .then((r) => r)
    .catch(() => false);

  if (appointment) {
    return res.status(200).json(msgHandler.pass(schedule));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }
};
