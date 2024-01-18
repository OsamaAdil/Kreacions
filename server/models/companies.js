const mongoose = require("mongoose");
const { Schema } = mongoose;

let companiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    locationDetails: [
      {
        _id: false,
        id: {
          type: String,
        },
        country: {
          type: String,
        },
        locality: {
          type: String,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
    companyLogo: {
      imageData: {
        type: Buffer,
        // required: true,
      },
      // contentType: {
      //   type: String,
      //   required: true,
      // },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notesHistory: [
      {
        _id: false,
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'users'
        },
        note: {
          type: String, 
          required: true
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

let companies = mongoose.model("companies", companiesSchema);
module.exports = companies;
