const mongoose = require("mongoose");

const appointment = new mongoose.Schema([
  {
    data: {
      date: {
        type: Date,
        required: true,
      },
      doctorName: {
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
      specialization: {
        type: String,
      },
      status: {
        type: String,
      },
      rescheduled: {
        type: Boolean,
      },
    },
  },
]);

module.exports = mongoose.model("appointments", appointment);
