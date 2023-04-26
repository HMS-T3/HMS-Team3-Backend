const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const emailValidator = require("../functions/emailValidator");
const sendMail = require("../functions/sendEmail");
const phoneValidator = require("../functions/phoneValidator.js");

module.exports.patient = async (req, res) => {
  const { email, password, phoneNumber, file } = req.body;

  let [hashed_password, query] = ["", {}];

  if (!emailValidator(email) && email)
    return res.status(200).json(msgHandler.fail({ Message: logs[11] }));

  if (!phoneValidator(phoneNumber) && phoneNumber)
    return res.status(200).json(msgHandler.fail({ Message: logs[21] }));

  if (email)
    if (!password)
      return res.status(200).json(msgHandler.fail({ Message: logs[4] }));
    else if (password.length < 7)
      return res.status(200).json(msgHandler.fail({ Message: logs[4] }));
    else hashed_password = await hash(email, password, enums.role_patient);
  else if (phoneNumber) {
  } else return res.status(200).json(msgHandler.fail({ Message: logs[22] }));

  if (email) hashed_password = await hash(email, password, enums.role_patient);
  else if (phoneNumber)
    hashed_password = await hash(phoneNumber, phoneNumber, enums.role_patient);

  if (email)
    query = {
      email: email,
      role: enums.role_patient,
    };
  else if (phoneNumber)
    query = {
      phoneNumber: phoneNumber,
      role: enums.role_patient,
    };

  await User.findOne(query)
    .exec()
    .then(async (user) => {
      if (user) {
        if (user.password === hashed_password) {
          if (email) await sendMail(email, `Hello ${email}`, logs[20], email);
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
    .then(async (user) => {
      if (user) {
        if (user.password === hashed_password) {
          await sendMail(email, `Hello ${email}`, logs[20], email);
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
