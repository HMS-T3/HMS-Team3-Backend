const User = require("../models.js").User;
const Appointment = require("../models.js").Appointment;

const enums = require("../enums/enum");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const { patient } = require("./login.js");

module.exports.updateUserprofile = async (req, res) => {
  const { user_id, contactNumber, role, name, dateOfBirth, biologicalGender } =
    req.body;

  const patientUser = await User.findOne({
    _id: user_id,
    role: role,
  })
    .exec()
    .then((r) => r)
    .catch((e) => false);

  if (patientUser) {
    const patientDetailsUpdate = {
      info: {
        phoneNumber: contactNumber,
        name: name,
        dateOfBirth: dateOfBirth,
        biologicalGender: biologicalGender,
      },
    };
    await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      patientDetailsUpdate
    )
      .then((r) => res.status(200).json(msgHandler.pass(logs[16])))
      .catch((e) => res.status(200).json(msgHandler.fail(e)));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }
};
