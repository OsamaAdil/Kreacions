const mongoose = require("mongoose");
const { Schema } = mongoose;

let currenciesSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    country: {
        type: String,
        required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // currencyIcon: {
    //   imageData: {
    //     type: Buffer
    //   },
    // }
  },
  { timestamps: true }
);

let currencies = mongoose.model("currencies", currenciesSchema);
module.exports = currencies;
