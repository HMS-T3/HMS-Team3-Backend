const User = require("../handler/models.js").User;
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
      populate: populate === "true" && [
        {
          path: "timeSlot",
        },
        {
          path: "doctor",
        },
        {
          path: "patient",
        },
      ],
    })
    .sort({ "schedule.timeSlot.time.endTime": 1 })
    .then((r) => {
      console.log(r);
      let schedule = r.schedule.filter((a) => a.timeSlot.day === day);
      res.send(schedule);
    })
    .catch((e) => false);

  if (!doctorExist) return res.status(200).json(msgHandler.fail("Error"));
  else return res.status(200).json(msgHandler.pass(doctorExist.schedule));
};
