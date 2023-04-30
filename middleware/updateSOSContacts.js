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
      role: enums.role_patient,
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
    .then(async (user) => {
      //   logs.logInfo("updateSOSContacts", "User updated successfully", user);
      //if there were 2 contacts before then remove the first one
      if (user.emergencyContacts.length >= 2) {
        await User.findOneAndUpdate(
          {
            _id: user_id,
            role: enums.role_patient,
          },
          {
            $pop: {
              emergencyContacts: -1,
            },
          }
        )
          .then((user) => {
            //   logs.logInfo("updateSOSContacts", "User updated successfully", user);
            res
              .status(200)
              .json(
                msgHandler.pass(
                  "User updated successfully removed first contact"
                )
              );
          })
          .catch((err) => {
            //   logs.logError("updateSOSContacts", "Error updating user", err);
            res.status(200).json(msgHandler.fail("Error updating user"));
          });
      } else res.status(200).json(msgHandler.pass("User updated successfully"));
    })
    .catch((err) => {
      //   logs.logError("updateSOSContacts", "Error updating user", err);
      res.status(200).json(msgHandler.fail("Error updating user"));
    });
};
