const mongoose = require("mongoose");

const user = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  doctorInfo: {
    specialization: {
      type: String,
    },
    degree: {
      type: String,
    },
    experience: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  availability: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "availability",
  },

  info: {
    //personal info
    profileImg: {
      type: String,
    },
    name: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
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
        // required: true,
      },
      emergencyPhoneNumber: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model("users", user);
