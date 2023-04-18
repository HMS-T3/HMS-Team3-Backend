const User = require("../models.js").User;
const enums = require("../enums/enum");

module.exports.patient = async (req, res) => {};

module.exports.staff = async (req, res) => {
  const { email, password, role } = req.body;
  if (password.length < 7) {
    return res
      .status(200)
      .json({ msg: "Password must be at least 8 characters long" });
  }
  if (password.length < 7) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters long" });
  }
  if (!email.includes(enums.domain)) {
    return res.status(400).json({
      msg: `email should be containing domains only of ${enums.domain}`,
    });
  }

  await new User({
    email: email,
    password: password,
    role: role,
  })
    .save()
    .then((r) => res.status(200).json({ msg: "Welcome to the club!" }))
    .catch((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(409).json({ msg: "Username already exists" });
        } else {
          return res
            .status(500)
            .json({ msg: "Error registering new user please try again." });
        }
      } else {
        res.status(200).json({ msg: "Welcome to the club!" });
      }
    });
};
