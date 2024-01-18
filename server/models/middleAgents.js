const mongoose = require("mongoose");
const { Schema } = mongoose;

let middleAgentsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      // unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    photo: {
      type: String, // Assuming the photo will be stored as a file path or URL
    },
    listOfCurrencies: {
      type: [String],
      default: [],
    },
    accountDetails:
    {
      bankName: {
        type: String,
        required: true,
      },
      accountName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      IFSCCode: {
        type: String,
        required: true,
      },
      branchName: {
        type: String,
        required: true,
      },
      swiftCode: {
        type: String,
        required: true,
      },
    },
    notesHistory: [
      {
        _id: false,
        note: {
          type: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

let middleAgents = mongoose.model("middleAgents", middleAgentsSchema);
module.exports = middleAgents;
