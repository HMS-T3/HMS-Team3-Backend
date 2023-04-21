const User = require("../handler/models.js").User;
const enums = require("../enums/enum");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const emailValidator = require("../functions/emailValidator");

module.exports.patient = async (req, res) => {
  const { email, password } = req.body;
  if (!(await emailValidator(email))) {
    return res.status(200).json(msgHandler.fail(logs[11]));
  }
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail(logs[4]));
  }
  const hashed_password = await hash(email, password, enums.role_patient);
  await User.findOne({
    email: email,
    role: enums.role_patient,
  })
    .exec()
    .then((user) => {
      if (user) {
        if (user.password === hashed_password) {
          return res
            .status(200)
            .json(msgHandler.pass({ id: user.id, Message: logs[5] }));
        } else {
          return res.status(200).json(msgHandler.fail(logs[6]));
        }
      } else {
        return res.status(200).json(msgHandler.fail(logs[7]));
      }
    })
    .catch(() => {
      return res.status(200).json(msgHandler.fail(logs[8]));
    });
};

module.exports.staff = async (req, res) => {
  const { email, password, role } = req.body;
  if (!(await emailValidator(email))) {
    return res.status(200).json(msgHandler.fail(logs[11]));
  }
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail(logs[4]));
  }
  const hashed_password = await hash(email, password, role);
  await User.findOne({
    email: email,
    role: role,
  })
    .exec()
    .then((user) => {
      if (user) {
        if (user.password === hashed_password) {
          return res
            .status(200)
            .json(msgHandler.pass({ id: user.id, Message: logs[5] }));
        } else {
          return res.status(200).json(msgHandler.fail(logs[6]));
        }
      } else {
        return res.status(200).json(msgHandler.fail(logs[7]));
      }
    })
    .catch(() => {
      return res.status(200).json(msgHandler.fail(logs[8]));
    });
};
