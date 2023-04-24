const Doctors = require("../handler/models").User;
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const enums = require("../constants/enum");

module.exports.getDoctors = async (req, res) => {
  const query = {
    role: enums.role_doctor,
  };
  await Doctors.find(query, [
    "-emergencyContacts",
    "-appointments",
    "-password",
    "-email",
    "-role",
    "-__v",
  ])
    .then((r) => res.status(200).json(msgHandler.pass(r)))
    .catch((e) => res.status(200).json(msgHandler.fail(e)));
};
