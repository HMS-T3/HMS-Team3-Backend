const User = require("../handler/models").User;
const enums = require("../constants/enum");

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
      res.send(availability);
    })
    .catch((e) => {
      console.log(e);
    });
};
