const User = require("../handler/models.js").User;
const Appointment = require("../handler/models.js").Appointment;
const Availability = require("../handler/models.js").Availability;

const enums = require("../constants/enum.js");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const sendSMS = require('../functions/sendSMS');

module.exports.bookAppointment = async (req, res) => {
  const { doctor_id, reason, day, startTime, endTime } = req.body;
  const { patient_id } = req.query;

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
    const availabilityExist = await Availability.findOne({
      user: doctor_id,
      day: day,
      time: { startTime: startTime, endTime: endTime },
    })
      .exec()
      .then((r) => (r ? r.booked : false))
      .catch((e) => false);

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
                    .then(async (r) => {true})
                    .catch((e) => false);
                  if (patientUpdateMsg) {
                    await User.findOneAndUpdate(
                      {
                        _id: doctorUser._id,
                      },
                      doctorUpdate
                    )
                      .then(async (r) => {
                        if(patientUser.phoneNumber){
                          console.log(patientUser.phoneNumber)
                          sendSMS(patientUser.phoneNumber,"Your appointment is booked");
                        }
                        if(doctorUser.phoneNumber){
                          console.log(doctorUser.phoneNumber)
                          sendSMS(doctorUser.phoneNumber,"An appointment for you is booked");
                        }
                        res.status(200).json(msgHandler.pass(logs[15]))
                  })
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
