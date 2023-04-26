const User = require("../handler/models.js").User;
const enums = require("../constants/enum.js");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");
const emailValidator = require("../functions/emailValidator");
const phoneValidator = require("../functions/phoneValidator.js");

module.exports.patient = async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  var emailOrPhone;
  var hashed_password;
  if(email){
    emailOrPhone = 'e';
    // console.log("e assigned");
  }
  else{
    emailOrPhone = 'p';
    // console.log("p assigned");
  }
  
  // console.log(emailOrPhone);

  if(emailOrPhone == 'p' && !(phoneValidator(phoneNumber))){
    // console.log((phoneValidator(phoneNumber)));
    // console.log("phone number not validated");
    return res.status(200).json(msgHandler.fail({Message: logs[20]}));
  }

  if(emailOrPhone == 'e'){ 
    if (!(await emailValidator(email))) {
    return res.status(200).json(msgHandler.fail({Message: logs[11]}));
  }
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail({Message: logs[4]}));
  }
  }

  if(emailOrPhone == 'e'){
    hashed_password = await hash(email, password, enums.role_patient);
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
            // console.log("wrong password email.")
            return res.status(200).json(msgHandler.fail(logs[6]));
          }
        } else {
          return res.status(200).json(msgHandler.fail(logs[7]));
        }
      })
      .catch(() => {
        return res.status(200).json(msgHandler.fail(logs[8]));
      });
    }

    if(emailOrPhone == 'p'){
      hashed_password = hash(phoneNumber);
      // console.log("fednkdwf",emailOrPhone,hashed_password)
      await User.findOne({
        phoneNumber: phoneNumber,
        role: enums.role_patient,
      })
        .exec()
        .then((user) => {
          if (user) {
            // console.log(user.password)
            // console.log(hashed_password)
            if (user.password === hashed_password) {
              return res
                .status(200)
                .json(msgHandler.pass({ id: user.id, Message: logs[5] }));
            } else {
              // console.log("wrong password phone.")
              return res.status(200).json(msgHandler.fail(logs[6]));
            }
          } else {
            return res.status(200).json(msgHandler.fail(logs[7]));
          }
        })
        .catch(() => {
          return res.status(200).json(msgHandler.fail(logs[8]));
        });
    }
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
