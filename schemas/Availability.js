const mongoose = require("mongoose");

const availability = new mongoose.Schema({
  //availability is an array of objects that contains the day and the time slots
  // each time slot has a boolean value that indicates if it is booked or not
  // if booked, the time slot will be disabled

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  day: {
    type: String,
  },
  time: {
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  booked: {
    type: Boolean,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointments",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("availability", availability);
