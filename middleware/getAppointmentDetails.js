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
    // .exec()
    .then((r) => {
      // console.log(r);
      if (r) return r;
      else return false;
    })
    .catch((e) => console.log(e), false);

  if (!AppointmentDetails)
    return res.status(200).json(msgHandler.fail("Error"));
  else
    return res
      .status(200)
      .json(msgHandler.pass(AppointmentDetails.appointments));
};
