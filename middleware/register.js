const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const emailValidator = require("../functions/emailValidator");
const specialization = require("../constants/specilization.js");
const sendMail = require("../functions/sendEmail");
const phoneValidator = require("../functions/phoneValidator.js");
const _ = require("lodash");

module.exports.patient = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  let [hashed_password, duplicateQueryCheck, query] = ["", {}, {}];

  if (!emailValidator(email) && email)
    return res.status(200).json(msgHandler.fail(logs[11]));

  if (!phoneValidator(phoneNumber) && phoneNumber)
    return res.status(200).json(msgHandler.fail(logs[21]));

  if (email)
    if (!password) return res.status(200).json(msgHandler.fail(logs[4]));
    else if (password.length < 7)
      return res.status(200).json(msgHandler.fail(logs[4]));
    else hashed_password = await hash(email, password, enums.role_patient);
  else if (phoneNumber) {
  } else return res.status(200).json(msgHandler.fail(logs[22]));

  if (email)
    duplicateQueryCheck = {
      email: email,
    };
  else if (phoneNumber)
    duplicateQueryCheck = {
      phoneNumber: phoneNumber,
    };

  const userExist = await User.findOne(duplicateQueryCheck)
    .exec()
    .then((r) => (r ? true : false))
    .catch((e) => false);
  if (userExist) return res.status(200).json(msgHandler.fail(logs[9]));

  if (email) hashed_password = await hash(email, password, enums.role_patient);
  else if (phoneNumber)
    hashed_password = await hash(phoneNumber, phoneNumber, enums.role_patient);

  if (email)
    query = {
      email: email,
      password: hashed_password,
      role: enums.role_patient,
    };
  else if (phoneNumber)
    query = {
      phoneNumber: phoneNumber,
      password: hashed_password,
      role: enums.role_patient,
    };

  await new User(query)
    .save()
    .then(async (r) => {
      if (email) {
        await sendMail(email, `Hello ${email}`, logs[20], email);
      }
      return res
        .status(200)
        .json(msgHandler.pass({ id: r.id, Message: logs[5] }));
    })
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

module.exports.staff = async (req, res) => {
  const { email, password, role } = req.body;
  let { specializations } = req.body;
  specializations = _.capitalize(specializations);
  if (role === enums.role_doctor) {
    if (!specializations) {
      return res.status(200).json(msgHandler.fail(logs[17]));
    } else {
      if (
        !specialization.map((e) => e.specialization).includes(specializations)
      ) {
        return res.status(200).json(msgHandler.fail(logs[18]));
      }
    }
  }
  if (!(await emailValidator(email))) {
    return res.status(200).json(msgHandler.fail(logs[11]));
  }
  if (!(role === enums.role_doctor || role === enums.role_nurse)) {
    return res.status(200).json(msgHandler.fail(logs[14]));
  }
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

  const userExist = await User.findOne({
    email: email,
    role: role,
  })
    .exec()
    .then((r) => (r ? true : false))
    .catch((e) => false);
  if (userExist) return res.status(200).json(msgHandler.fail(logs[9]));

  const hashed_password = await hash(email, password, role);
  await new User({
    email: email,
    password: hashed_password,
    role: role,
    doctorInfo: {
      specialization: role === enums.role_doctor && specializations,
    },
  })
    .save()
    .then(async (r) => {
      await sendMail(
        email,
        `Hello ${email}`,
        "You have successfully logged in to your account.",
        email
      );
      return res
        .status(200)
        .json(msgHandler.pass({ id: r._id, Message: logs[5] }));
    })
    .catch((err) => {
      // console.log("DVsdv", err);
      if (err) {
        if (err.code === 11000) {
          return res.status(409).json(msgHandler.fail(logs[9]));
        } else {
          return res.status(500).json(msgHandler.fail(logs[10]));
        }
      }
    });
};
