const Availability = require("../handler/models").Availability;
const User = require("../handler/models").User;
const enums = require("../constants/enum");
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

module.exports.addAvailability = async (req, res) => {
  let { doctorId, day, startTime, endTime } = req.body;
  const doctorExist = await User.findOne({
    _id: doctorId,
    role: enums.role_doctor,
  })
    .exec()
    .then((r) => (r ? true : false))
    .catch((e) => false);

  if (!doctorExist) return res.status(200).json(msgHandler.fail(logs[10]));

  const availabilityExist = await Availability.find({
    user: doctorId,
  })
    .exec()
    .then((r) => {
      let startTimes = r.map((r) => r.time.startTime);
      let endTimes = r.map((r) => r.time.endTime);
      let days = r.map((r) => r.day);
      if (r) {
        if (
          startTimes.includes(startTime) &&
          endTimes.includes(endTime) &&
          days.includes(day)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

  if (availabilityExist)
    return res.status(200).json(msgHandler.fail("Already Slot Exists"));

  await new Availability({
    user: doctorId,

    day: day,
    time: { startTime: startTime, endTime: endTime },
    booked: false,
  })
    .save()
    .then(async (r) => {
      await User.findOne({ _id: doctorId, role: enums.role_doctor })
        .exec()
        .then(async (r) => {
          await User.updateOne(
            { _id: doctorId, role: enums.role_doctor },
            { availability: r.availability.concat([r._id]) }
          )
            .exec()
            .then((r) => {
              return res
                .status(200)
                .json(msgHandler.pass("User Updated with availability"));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          if (err) {
            return res
              .status(500)
              .json(msgHandler.fail("User not updated availability created"));
          }
        });
    })
    .catch((err) => {
      //   console.log("Error", err);
      return res.status(200).json(msgHandler.fail("Availability not created"));
    });
};
