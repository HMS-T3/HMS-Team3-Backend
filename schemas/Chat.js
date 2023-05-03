const mongoose = require("mongoose");

const chat = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointments",
  },
  messages: [
    {
      sentBy: {
        type: String,
        enum: {
          values: ["doctor", "patient"],
          message: "Invalid sentBy value",
        },
      },
      message: {
        type: String,
      },
      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});
