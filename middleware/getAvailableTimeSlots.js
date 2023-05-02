const User = require("../handler/models").User;
const enums = require("../constants/enum");

module.exports.getAvailableTimeSlots = async (req, res, next) => {
  const { doctor_id, day } = req.query;
  const doctor = await User.findOne({
    where: {
      id: doctor_id,
      role: enums.role_doctor,
    },
  })
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
};
