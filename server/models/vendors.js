const mongoose = require("mongoose");
const { Schema } = mongoose;

let vendorSchema = new Schema(
  {
    vendorType: {
      type: String,
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
      // required: true,
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
    country: {
      type: String,
    },
    accountDetails:
    {
      bankName: {
        type: String,
        // required: true,
      },
      accountName: {
        type: String,
        // required: true,
      },
      accountNumber: {
        type: String,
        // required: true,
      },
      IFSCCode: {
        type: String,
        // required: true,
      },
      branchName: {
        type: String,
        // required: true,
      },
      swiftCode: {
        type: String,
        // required: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notesHistory: [
      {
        _id: false,
        user: {
          // type: mongoose.Types.ObjectId,
          // ref: 'users'
          type: String,
        },
        note: {
          type: String, 
          // required: true
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

let vendors = mongoose.model("vendors", vendorSchema);
module.exports = vendors;
