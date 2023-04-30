const User = require("../handler/models.js").User;

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.updateUserprofile = async (req, res) => {
  const { contactNumber, name, dateOfBirth, biologicalGender, profileImg } =
    req.body;
  const { user_id, role } = req.query;

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
        profileImg: profileImg ? profileImg : user.info.profileImg,
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
        profileImg: profileImg,
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
      .then(
        async (r) =>
          await User.findOne({
            _id: user_id,
            role: role,
          })
            .exec()
            .then((r) => res.status(200).json(msgHandler.pass(r)))
            .catch((e) => res.status(200).json(msgHandler.fail(e)))
      )
      .catch((e) => res.status(200).json(msgHandler.fail(e)));
  } else {
    return res.status(200).json(msgHandler.fail(logs[7]));
  }
};
