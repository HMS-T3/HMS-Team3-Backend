const msgHandler = require("../functions/msgHandler");
module.exports.home = (req, res) => {
  res.status(200).json(msgHandler.pass("Server running"));
};
