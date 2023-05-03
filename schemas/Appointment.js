const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "availability",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  chat: {
    type: Boolean,
    default: false,
  },
  chats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chats",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  reason: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("appointments", appointment);
