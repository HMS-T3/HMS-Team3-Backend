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
    .then((r) => {
      if (r) {
        let schedule = r.schedule.filter((a) => a.timeSlot.day === day);
        if (schedule.length === 0)
          return res
            .status(200)
            .json(msgHandler.fail(null));
        else {
          schedule.sort((a, b) =>
            a.timeSlot.time.startTime.localeCompare(b.timeSlot.time.startTime)
          );
          return res.status(200).json(msgHandler.pass(schedule));
        }
      } else {
        return false;
      }
    })
    .catch((e) => false);

  if (!doctorExist) return res.status(200).json(msgHandler.fail("Error"));
  // else return res.status(200).json(msgHandler.pass(doctorExist.schedule));
};
