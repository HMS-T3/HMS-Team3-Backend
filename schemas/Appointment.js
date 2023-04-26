const mongoose = require("mongoose");

const appointment = new mongoose.Schema([
  {
    // data: {
    whenDate: {
      type: Date,
      required: true,
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
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prescriptions",
    },

  },
  // },
]);

module.exports = mongoose.model("appointments", appointment);
