const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
  // data: {
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "availability",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  location: {
    longitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  reason: {
    type: String,
  },

  status: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("appointments", appointment);
