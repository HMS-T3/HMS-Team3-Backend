const User = require("../handler/models.js").User;

const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.updateSOSContacts = async (req, res) => {
  const { name, phoneNumber, email, relation } = req.body;
  const { user_id } = req.params;
};
