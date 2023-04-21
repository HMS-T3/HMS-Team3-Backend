const User = require("../handler/models.js").User;
const Appointment = require("../handler/models.js").Appointment;

const enums = require("../enums/enum");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

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
      .then(async (r) => {
        const patientUpdate = {
          appointments: [...patientUser.appointments, r._id],
        };
        const doctorUpdate = {
          schedule: [...doctorUser.schedule, r._id],
        };
        const patientUpdateMsg = await User.findOneAndUpdate(
          {
            _id: patientUser._id,
          },
          patientUpdate
        )
          .then((r) => true)
          .catch((e) => false);

        if (patientUpdateMsg) {
          await User.findOneAndUpdate(
            {
              _id: doctorUser._id,
            },
            doctorUpdate
          )
            .then((r) => res.status(200).json(msgHandler.pass(logs[15])))
            .catch((e) => res.status(200).json(msgHandler.fail(e)));
        } else {
          return res.status(200).json(msgHandler.fail(patientUpdateMsg));
        }
      })
      .catch((e) => {
        return res.status(200).json(msgHandler.fail(e));
      });
  } else {
    return res.status(200).json(msgHandler.fail(logs[12]));
  }
};
