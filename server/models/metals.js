const mongoose = require("mongoose");
const { Schema } = mongoose;

let metalsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalPureMetal: {
      type: Number,
    },
    totalMoneyVested: {
      type: Number,
    },
    totalValueBasedOnCurrentPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

let metals = mongoose.model("metals", metalsSchema);
module.exports = metals;
