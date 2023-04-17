const mongoose = require("mongoose");

const healthRecord = new mongoose.Schema({
  doctorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  reasonOfVisit: {
    type: String,
  },

  date: {
    type: Date.now(),
    trim: true,
  },

  vitals: {
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    blood: {
      type: String,
    },
    bloodPressure: {
      systolic: {
        type: Number,
      },
      diastolic: {
        type: Number,
      },
    },
    pulse: {
      type: Number,
    },
    bodyTemperature: {
      type: Number,
    },
    oxygenLevel: {
      type: Number,
    },
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prescriptions",
  },
});

module.exports = mongoose.model("healthRecords", healthRecord);
