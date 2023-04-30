const User = require("../handler/models.js").User;

const logs = require("../logs/logs");
const enums = require("../constants/enum");
const msgHandler = require("../functions/msgHandler");

module.exports.updateSOSContacts = async (req, res) => {
  const { name, phoneNumber, email, relation } = req.body;
  const { user_id } = req.query;

  await User.findOneAndUpdate(
    {
      _id: user_id,
      role: enums.roles.patient,
    },
    {
      $push: {
        emergencyContacts: {
          name,
          phoneNumber,
          email,
          relation,
        },
      },
    }
  )
    .then((user) => {
      //   logs.logInfo("updateSOSContacts", "User updated successfully", user);
      msgHandler.pass("User updated successfully");
    })
    .catch((err) => {
      //   logs.logError("updateSOSContacts", "Error updating user", err);
      msgHandler.fail("Error updating user");
    });
};
