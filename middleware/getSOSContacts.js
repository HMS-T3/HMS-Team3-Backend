const User = require("../handler/models").User;
const msgHandler = require("../functions/msgHandler");

module.exports.getSOSContacts = async (req, res, next) => {
  const { user_id } = req.query;
  await User.findOne({ _id: user_id })
    .then((user) => {
      if (user) {
        res.status(200).json(msgHandler.pass(user.emergencyContacts));
      } else {
        res.status(404).json(msgHandler.fail("User not found"));
      }
    })
    .catch((err) => {
      res.status(500).json(msgHandler.fail("Internal server error"));
    });
};
