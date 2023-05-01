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
    steps:{
      daily:{
          startDate:{
            type: Date,
          },
          endDate:{
            type: Date,
          },
          stepCount:{
            type: Number,
          },
      }, 
      weekly:{
        startDate:{
          type: Date,
        },
        endDate:{
          type: Date,
        },
        stepCount:{
          type: Number,
        },
      },
      monthly:{
        startDate:{
          type: Date,
        },
        endDate:{
          type: Date,
        },
        stepCount:{
          type: Number,
        },
      },
      yearly:{
        startDate:{
          type: Date,
        },
        endDate:{
          type: Date,
        },
        stepCount:{
          type: Number,
        },
      },
    },
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prescriptions",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("healthRecords", healthRecord);
