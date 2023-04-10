const mongoose = require("mongoose");

const user = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("users", user);
