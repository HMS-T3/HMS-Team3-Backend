const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const emailValidator = require("../functions/emailValidator");
const specialization = require("../constants/specilization.js");
const phoneValidator = require("../functions/phoneValidator.js");

module.exports.patient = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  var emailOrPhone;
  var hashed_password;
  if(email){
    emailOrPhone = 'e';
    // console.log("assigned e");
  }
  else if(phoneNumber){
    emailOrPhone = 'p';
    // console.log("assigned p");
  }
  
  if(emailOrPhone == 'p' && !(await phoneValidator(phoneNumber))){
    console.log("Number verified");
    return res.status(200).json(msgHandler.fail({Message: logs[20]}));
  }

  if(emailOrPhone == 'e'){ 
    if (!(await emailValidator(email))) {
    return res.status(200).json(msgHandler.fail({Message: logs[11]}));
  }
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail({Message: logs[4]}));
  }
  // console.log("email verified");
}

// console.log(emailOrPhone);


if(emailOrPhone == 'e'){
  const userExist = await User.findOne({
    email: email,
    role: enums.role_patient,
  })
    .exec()
    .then((r) => (r ? true : false))
    .catch((e) => false);
    if (userExist) {
      // console.log("point0");
      return res.status(200).json(msgHandler.fail({Message: logs[9]}));
    }

  hashed_password = hash(email, password, enums.role_patient);
}
else if(emailOrPhone == 'p'){
  const userExist = await User.findOne({
    role: enums.role_patient,
    phoneNumber : phoneNumber,
  })
    .exec()
    .then((r) => (r ? true : false))
    .catch((e) => false);
    if (userExist) {
      // console.log("point1");
      return res.status(200).json(msgHandler.fail({Message: logs[9]}));
    }

    hashed_password = hash(phoneNumber);
    // console.log(hashed_password)
}

  // const userExist = await User.findOne({
  //   email: email,
  //   role: enums.role_patient,
  //   phoneNumber : phoneNumber,
  // })
    // .exec()
    // .then((r) => (r ? true : false))
    // .catch((e) => false);
  // if (userExist) return res.status(200).json(msgHandler.fail({Message: logs[9]}));

  // const hashed_password = await hash(email, password, enums.role_patient);
  // console.log("fdevefrv",hashed_password,emailOrPhone)
  await new User({
    email: email,
    password: hashed_password,
    role: enums.role_patient,
    phoneNumber : phoneNumber,
  })
    .save()
    .then((r) =>
      res.status(200).json(msgHandler.pass({ id: r.id,password: r.password, Message: logs[5] }))
    )
    .catch((err) => {
      if (err) {
        if (err.code === 11000) {
          // console.log(point2);
          return res.status(409).json(msgHandler.fail({Message: logs[9]}));
        } else {
          return res.status(500).json(msgHandler.fail({Message: logs[10]}));
        }
      }
    });
};

module.exports.staff = async (req, res) => {
  const { email, password, role, specializations } = req.body;
  if (role === enums.role_doctor) {
    if (!specializations) {
      return res.status(200).json(msgHandler.fail({Message: logs[17]}));
    } else {
      if (!Object.keys(specialization).includes(specializations)) {
        return res.status(200).json(msgHandler.fail({Message: logs[18]}));
      }
    }
  }
  if (!(await emailValidator(email))) {
    return res.status(200).json(msgHandler.fail({Message: logs[11]}));
  }
  if (!(role === enums.role_doctor || role === enums.role_nurse)) {
    return res.status(200).json(msgHandler.fail({Message: logs[14]}));
  }
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail({Message: logs[4]}));
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
  if (userExist) return res.status(200).json(msgHandler.fail({Message: logs[9]}));

  const hashed_password = await hash(email, password, role);
  await new User({
    email: email,
    password: hashed_password,
    role: role,
    specialization: role === enums.role_doctor && specializations,
  })
    .save()
    .then((r) =>
      res.status(200).json(msgHandler.pass({ id: r._id, Message: logs[5] }))
    )
    .catch((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(409).json(msgHandler.fail({Message: logs[9]}));
        } else {
          return res.status(500).json(msgHandler.fail({Message: logs[10]}));
        }
      }
    });
};
