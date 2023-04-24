const mongoose = require("mongoose");

const user = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    name: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
    biologicalGender: {
      type: String,
    },
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
    },
  ],
  schedule: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
    },
  ],
  emergencyContacts: [
    {
      name: {
        type: String,
        required: true,
      },
      emergencyPhoneNumber: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model("users", user);
