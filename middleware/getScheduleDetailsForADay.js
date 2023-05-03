// const Appointment = require("../handler/models.js").Appointment;
const User = require("../handler/models.js").User;
const Availability = require("../handler/models.js").Availability;
const enums = require("../constants/enum.js");

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.getScheduleDetailsForADay = async (req, res) => {
  const { doctor_id, populate, day } = req.query;
  console.log(day);
  const doctorExist = await User.findOne({
    _id: doctor_id,
    role: enums.role_doctor,
  })
    .populate({
      path: "schedule",
      //   match: {"timeSlot.day": day },
      select: "-_id -__v",
      populate: populate === "true" && [
        {
          path: "timeSlot",
          match: { day: day },
          select: "-_id -__v",
          sort: { startTime: 1 },
        },
        {
          path: "doctor",
          select: "email doctorInfo info",
        },
        {
          path: "patient",
          select: "email info",
        //   populate: { 
        //         path: "user", 
        //         select: "email info",
        //         populate:{
        //             path: "info",
        //             select: "name profileImg bilogicalGender"
        //         } 
            // },
        },
      ],
    })
    .sort({ "schedule.timeSlot.time.endTime": 1 })
    // .exec()
    .then((r) => {
      if (r) return r;
      else return false;
    })
    .catch((e) => false);

  if (!doctorExist) return res.status(200).json(msgHandler.fail("Error"));
  else return res.status(200).json(msgHandler.pass(doctorExist.schedule));
};
