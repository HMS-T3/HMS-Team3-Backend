const User = require("../handler/models.js").User;
const Appointment = require("../handler/models.js").Appointment;
const Availability = require("../handler/models.js").Availability;

const enums = require("../constants/enum.js");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.bookAppointment = async (req, res) => {
  const { patient_id, doctor_id, reason, day, startTime, endTime } = req.body;
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
    //check if the doctor is available
    // console.log("availabilityExist", availabilityExist, "doctor_id", doctor_id);

    const availabilityExist = await Availability.findOne({
      user: doctor_id,
      day: day,
      time: { startTime: startTime, endTime: endTime },
    })
      .exec()
      .then((r) => (r ? r.booked : false))
      .catch((e) => false);
    // console.log("availabilityExist", availabilityExist, "doctor_id", doctor_id);

    if (availabilityExist)
      return res
        .status(200)
        .json(msgHandler.fail("Some One Already booked the slots"));
    else
      await Availability.findOneAndUpdate(
        {
          user: doctor_id,
          day: day,
          time: { startTime: startTime, endTime: endTime },
        },
        { booked: true }
      )
        .then(async (r) => {
          if (r) {
            //check if the appointment already exists
            const appointmentExist = await Appointment.findOne({
              timeSlot: r._id,
              doctor: doctor_id,
              patient: patient_id,
            })
              .exec()
              .then((r) => (r ? true : false))
              .catch((e) => false);
            if (appointmentExist)
              return res.status(200).json(msgHandler.fail("Already Booked"));
            else
              await new Appointment({
                timeSlot: r._id,
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
                      .then((r) =>
                        res.status(200).json(msgHandler.pass(logs[15]))
                      )
                      .catch((e) => res.status(200).json(msgHandler.fail(e)));
                  } else {
                    return res
                      .status(200)
                      .json(msgHandler.fail(patientUpdateMsg));
                  }
                })
                .catch((e) => {
                  return res.status(200).json(msgHandler.fail(e));
                });
          } else {
            return res
              .status(200)
              .json(
                msgHandler.fail("Availability Not Found of provided doctor")
              );
          }
        })
        .catch((e) => {
          return res
            .status(200)
            .json(msgHandler.fail("Availability Not Found of provided doctor"));
        });
  } else {
    return res.status(200).json(msgHandler.fail(logs[12]));
  }
};
