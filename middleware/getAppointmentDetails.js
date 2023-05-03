const Appointment = require("../handler/models.js").Appointment;
const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.getAppointmentDetails = async (req, res) => {
  const { patientId, populate } = req.query;

  await User.findOne({
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
      const events = [...r.appointments];

      events.sort((a, b) => {
        const dateA = new Date(a.timeSlot.day.split("-").reverse().join("-"));
        const dateB = new Date(b.timeSlot.day.split("-").reverse().join("-"));
        const dateComparison = dateA - dateB;
        if (dateComparison !== 0) {
          return dateComparison;
        }
        const timeA = parseInt(a.timeSlot.time.startTime.replace(":", ""), 10);
        const timeB = parseInt(b.timeSlot.time.endTime.replace(":", ""), 10);
        return timeA - timeB;
      });
      return r.appointments.length > 0
        ? res.status(200).json(msgHandler.pass(events))
        : res.status(200).json(msgHandler.pass(null));
    })
    .catch((e) => {
      res.status(200).json(msgHandler.fail("Some Error"));
    });
};
