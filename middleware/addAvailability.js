const Availability = require("../handler/models").Availability;
const User = require("../handler/models").User;
const enums = require("../constants/enum");
const msgHandler = require("../functions/msgHandler");
const logs = require("../logs/logs");

module.exports.addAvailability = async (req, res) => {
  const { doctorId, day, startTime, endTime } = req.body;
  const doctorExist = await User.findOne({
    _id: doctorId,
    role: enums.role_doctor,
  })
    .exec()
    .then((r) => (r ? true : false))
    .catch((e) => false);

  if (!doctorExist) return res.status(200).json(msgHandler.fail(logs[10]));

  //check if the doctor already has an availability on the same day and same time
  const availabilityExist = await Availability.find({
    user: doctorId,
  })
    .exec()
    .then((r) => {
      console.log("Avail", r);
      //only return the availability that has the same day and time
      let resp = r.filter((a) => {
        console.log("a", a);
        if (
          a.availability.day === day &&
          a.availability.time.startTime === startTime &&
          a.availability.time.endTime === endTime
        )
          return true;
        else return false;
      });
      console.log("r", resp);
      return r ? true : false;
    })
    .catch((e) => false);

  if (availabilityExist)
    return res.status(200).json(msgHandler.fail("Already booked"));

  await new Availability({
    user: doctorId,
    availability: {
      day: day,
      time: { startTime: startTime, endTime: endTime },
      booked: false,
    },
  })
    .save()
    .then(async (r) => {
      await User.findOneAndUpdate(
        { _id: doctorId, role: enums.role_doctor },
        { $push: { availability: r._id } },
        { new: true }
      )
        .exec()
        .then((r) => {
          return res
            .status(200)
            .json(msgHandler.pass("User Updated with availability"));
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
