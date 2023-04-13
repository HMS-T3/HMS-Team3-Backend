const mongoose = require("mongoose");

const prescription = new mongoose.Schema({
  diagnosis: {
    type: String,
    required: true
  },
  medicine: [
    {
      name: {
        type: String,
      },
      dosage: {
        timeOfTheDay: [
          {
            type: String,
          },
        ],
        amount: [
          {
            type: Number,
          },
        ],
        amountType: {
          type: String,
        },
      },
    },
  ],
  labTest: [
    {
      name: {
        type: String,
      },
      results: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("prescriptions", prescription);
