const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const Appointment = require("../handler/models.js").Appointment;
const Availability = require("../handler/models.js").Availability;
const msgHandler = require("../functions/msgHandler");

module.exports.makeChatTrue = async (req, res) => {
  const { patient_id, day, fromTime, endTime } = req.body;
  const { doctor_id } = req.query;

  const doctorExist = await User.findOne({
    _id: doctor_id,
    role: enums.role_doctor,
  })
    .then((r) => {
      if (r) return r;
      else return false;
    })
    .catch((e) => false);

  const patientExist = await User.findOne({
    _id: patient_id,
    role: enums.role_patient,
  })
    .then((r) => {
      if (r) return r;
      else return false;
    })
    .catch((e) => false);

  if (!doctorExist || !patientExist)
    return res.status(200).json(msgHandler.fail("Error1"));
  //   else return res.status(200).json(msgHandler.pass("Success"));
  else {
    const availability = await Availability.findOne({
      user: doctor_id,
      day: day,
      time: {
        startTime: fromTime,
        endTime: endTime,
      },
    })
      .then((r) => {
        if (r) return r;
        else return false;
      })
      .catch((e) => false);

    if (!availability) return res.status(200).json(msgHandler.fail("Error2"));
    else
      await Appointment.findOneAndUpdate(
        {
          doctor: doctor_id,
          patient: patient_id,
          timeSlot: availability._id,
        },
        { chat: true }
      )
        .then((r) => {
          if (r) return res.status(200).json(msgHandler.pass("Success"));
          else return res.status(200).json(msgHandler.fail("Error3"));
        })
        .catch((e) => res.status(200).json(msgHandler.fail("Error4")));
  }
};
