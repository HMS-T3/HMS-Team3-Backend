const User = require("../handler/models.js").User;

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.updateUserprofile = async (req, res) => {
  const { user_id, contactNumber, role, name, dateOfBirth, biologicalGender } =
    req.body;

  const user = await User.findOne({
    _id: user_id,
    role: role,
  })
    .exec()
    .then((r) => r)
    .catch(() => false);

  let updates = {};
  try {
    updates = {
      info: {
        phoneNumber: contactNumber ? contactNumber : user.info.phoneNumber,
        name: name ? name : user.info.name,
        dateOfBirth: dateOfBirth ? dateOfBirth : user.info.dateOfBirth,
        biologicalGender: biologicalGender
          ? biologicalGender
          : user.info.biologicalGender,
      },
    };
  } catch (e) {
    updates = {
      info: {
        phoneNumber: contactNumber,
        name: name,
        dateOfBirth: dateOfBirth,
        biologicalGender: biologicalGender,
      },
    };
  }


  if (user) {
    await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      updates
    )
      .then((r) => res.status(200).json(msgHandler.pass(r)))
      .catch((e) => res.status(200).json(msgHandler.fail(e)));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }
};
