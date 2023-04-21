const User = require("../models.js").User;
const Appointment = require("../models.js").Appointment;

const enums = require("../enums/enum");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const { patient } = require("./login.js");

module.exports.bookAppointment = async (req, res) => {
  const { patient_id, doctor_id, reason, whenDate } = req.body;
  const patientUser = await User.findOne(
    {
      _id: patient_id,
      role: enums.role_patient,
    },
    "-password"
  )
    .exec()
    .then((r) => r)
    .catch((e) => false);
  const doctorUser = await User.findOne(
    {
      _id: doctor_id,
      role: enums.role_doctor,
    },
    "-password"
  )
    .exec()
    .then((r) => r)
    .catch((e) => false);
  if (patientUser && doctorUser) {
    await new Appointment({
      whenDate: whenDate,
      doctor: doctor_id,
      patient: patient_id,
      reason: reason,
    })
      .save()
      .then((r) => {
        console.log("User", patientUser, "Doctor", doctorUser);
        return res.status(200).json(msgHandler.pass(r));
      })
      .catch((e) => {
        return res.status(200).json(msgHandler.fail(e));
      });
  } else {
    return res.status(200).json(msgHandler.fail(logs[12]));
  }
};
