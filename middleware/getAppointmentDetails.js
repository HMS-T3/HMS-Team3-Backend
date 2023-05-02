const Appointment = require("../handler/models.js").Appointment;
const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.getAppointmentDetails = async (req, res) => {
  const { patientId, populate } = req.query;

  const AppointmentDetails = await User.findOne({
    _id: patientId,
    role: enums.role_patient,
  })
    // .sort({ timeSlot.startTime: 1 })
    .populate({
      path: "appointments",
      select: "-_id -__v",
      populate: populate === "true" && [
        {
          path: "doctor",
          select: "email doctorInfo info ",
        },
        {
          path: "timeSlot",
          select: "-_id -__v",
        },
        {
          path: "patient",
          select: "email info ",
        },
      ],
    })
    .sort({ "appointments.timeSlot.time.endTime": 1 })
    .then((r) => {
      r.schedule.length > 0
        ? res.status(200).json(msgHandler.pass(r.availability))
        : res.status(200).json(msgHandler.pass([r]));
    })
    .catch((e) => {
      res.status(200).json(msgHandler.fail("Some Error"));
    });
};
