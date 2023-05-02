const User = require("../handler/models").User;
const enums = require("../constants/enum");
const msgHandler = require("../functions/msgHandler");

module.exports.getAvailableTimeSlots = async (req, res, next) => {
  const { doctor_id, day, booked } = req.query;
  const doctor = await User.findOne({
    _id: doctor_id,
    role: enums.role_doctor,
  })
    .populate({
      path: "availability",
      select: "time day booked -_id",
    })
    .then((r) => {
      let flagBooked = booked === "true" ? true : false;
      let availability = r.availability
        .filter((a) => a.day === day && a.booked === flagBooked)
        .map((a) => {
          return Object.values(a.time);
        });
      availability.length > 0
        ? res.status(200).json(msgHandler.pass(availability))
        : res.status(200).json(msgHandler.pass(null));
    })
    .catch((e) => {
      res.status(200).json(msgHandler.fail("Some Error"));
    });
};
