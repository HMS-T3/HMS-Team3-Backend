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
    .then((r) => {
      if (r) return r;
      else return false;
    })
    .catch((e) => false);

  if (!doctorExist) return res.status(200).json(msgHandler.fail("Error"));
  else return res.status(200).json(msgHandler.pass(doctorExist.schedule));
};
