const mongoose = require("mongoose");
const { Schema } = mongoose;

let vendorSchema = new Schema(
  {
    vendorType: {
      type: String,
      enum: ["company", "individual"],
      required: true,
    },
    name: {
      type: String,
    },
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
      type: String,
    },
    listOfCurrencies: {
      type: [String],
      default: [],
    },
    accountNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    country: {
      type: String,
    },
    notesHistory: [{
      _id: false,
      note: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  { timestamps: true }
);

let vendors = mongoose.model("vendors", vendorSchema);
module.exports = vendors;
