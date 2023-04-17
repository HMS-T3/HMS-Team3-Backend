const mongoose = require("mongoose");

const user = new mongoose.Schema({
  role: {
    type: String,
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
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    biologicalGender: {
      type: String,
    },
    records: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "healthRecords",
      },
    ],
  },
});
module.exports = mongoose.model("users", user);
