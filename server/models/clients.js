const mongoose = require("mongoose");
const { Schema } = mongoose;

let clientsSchema = new Schema(
  {
    clientType: {
      type: String,
      enum: ["company", "individual"],
      required: true,
    },
    clientCategory: {
      type: String,
      enum: ["job", "normal", "both"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email : {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
    companyName: {
      type: String,
    },
    address: {
      type: String,
    },
    accountNumber: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    listOfCurrencies: {
      type: [String],
      default: [],
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

let clients = mongoose.model("clients", clientsSchema);
module.exports = clients;
