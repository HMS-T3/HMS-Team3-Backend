const mongoose = require("mongoose");

const user = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  availability: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "availability",
    },
  ],
  doctorInfo: {
    specialization: {
      type: String,
      default: "",
    },
    degree: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  info: {
    //personal info
    profileImg: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: "",
    },
    biologicalGender: {
      type: String,
      default: "",
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
        default: "",

        // required: true,
      },
      phoneNumber: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      relation: {
        type: String,
        default: "",
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("users", user);
