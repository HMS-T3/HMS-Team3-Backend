const User = require("../models.js").User;
const enums = require("../enums/enum");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.patient = async (req, res) => {};

module.exports.staff = async (req, res) => {
  const { email, password, role } = req.body;
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail(logs[4]));
  }
  if (!email.includes(enums.domain)) {
    return res
      .status(400)
      .json(
        msgHandler.fail(
          `email should be containing domains only of ${enums.domain}`
        )
      );
  }
  const hashed_password = await hash(password);
  await new User({
    email: email,
    password: hashed_password,
    role: role,
  })
    .save()
    .then((r) => res.status(200).json(msgHandler.pass(logs[5])))
    .catch((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(409).json(msgHandler.fail(logs[9]));
        } else {
          return res.status(500).json(msgHandler.fail(logs[10]));
        }
      }
    });
};
