const User = require("../models.js").User;
const enums = require("../enums/enum");

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

module.exports.doctor = async (req, res) => {
  const { email, password, role } = req.body;
  if (password.length < 7) {
    return res
      .status(200)
      .json({ msg: "Password must be at least 8 characters long" });
  }
  const userFound = await User.findOne({
    email: email,
    role: enums.role_doctor,
  })
    .exec()
    .then((user) => {
      if (user) {
        if (user.password === password) {
          return res.status(200).json({ msg: "Welcome back!" });
        } else {
          return res.status(200).json({ msg: "Wrong Password" });
        }
      } else {
        return res.status(200).json({ msg: "User not found" });
      }
    })
    .catch((err) => {
      return res.status(200).json({ msg: "Error logging in" });
    });
};
