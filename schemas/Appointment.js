const mongoose = require("mongoose");

const appointment = new mongoose.Schema([
  {
    // data: {
    whenDate: {
      type: Date,
      required: true,
    },
    doctor: {
      type: String,
    },
    patientName: {
      type: String,
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
  },
  // },
]);

module.exports = mongoose.model("appointments", appointment);
