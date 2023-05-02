// const Appointment = require("../handler/models.js").Appointment;
const User = require("../handler/models.js").User;
const Availability = require("../handler/models.js").Availability;
const enums = require("../constants/enum.js");

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.getScheduleDetails = async (req, res) => {
  const { doctor_id, populate } = req.query;
  const doctorExist = await User.findOne({
    _id: doctor_id,
    role: enums.role_doctor,
  })
    .populate({
      path: "schedule",
      select: "-_id -__v",
      populate: populate === "true" && [
        {
          path: "timeSlot",
          select: "-_id -__v",
          sort: { startTime: 1 },
        },
        {
          path: "doctor",
          select: "email doctorInfo info ",
        },
        {
          path: "patient",
          select: "email info ",
        },
      ],
    })
    .sort({ "schedule.timeSlot.time.endTime": 1 })
    .then((r) =>
      r.schedule.length > 0
        ? res.status(200).json(msgHandler.pass(r.schedule))
        : res.status(200).json(msgHandler.pass(null))
    )
    .catch((e) => {
      res.status(200).json(msgHandler.fail("Some Error"));
    });
};
