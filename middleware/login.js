const User = require("../models.js").User;
const enums = require("../enums/enum");
const hash = require("../functions/hash");
const logs = require("../logs/logs");
const msgHandler = require("../functions/msgHandler");

module.exports.patient = async (req, res) => {
  // const { username, password, role } = req.body;
  // if (password.length < 7) {
  //   return res
  //     .status(200)
  //     .json({ msg: "Password must be at least 8 characters long" });
  // }
  // const userFound = await User.findOne({ userName: username })
  //   .exec()
  //   .then((user) => {
  //     if (user) {
  //       if (user.password === password) {
  //         return res.status(200).json({ msg: "Welcome back!" });
  //       } else {
  //         return res.status(200).json({ msg: "Wrong Password" });
  //       }
  //     } else {
  //       return res.status(200).json({ msg: "User not found" });
  //     }
  //   })
  //   .catch((err) => {
  //     return res.status(200).json({ msg: "Error logging in" });
  //   });
};

module.exports.staff = async (req, res) => {
  const { email, password, role } = req.body;
  if (password.length < 7) {
    return res.status(200).json(msgHandler.fail(logs[4]));
  }
  const hashed_password = await hash(password);
  await User.findOne({
    email: email,
    role: role,
  })
    .exec()
    .then((user) => {
      if (user) {
        // const hashed_password = await hash(password);
        if (user.password === hashed_password) {
          return res.status(200).json(msgHandler.pass(logs[5]));
        } else {
          return res.status(200).json(msgHandler.fail(logs[6]));
        }
      } else {
        return res.status(200).json(msgHandler.fail(logs[7]));
      }
    })
    .catch((err) => {
      return res.status(200).json(msgHandler.fail(logs[8]));
    });
};
