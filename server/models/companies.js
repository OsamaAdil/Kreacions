const mongoose = require("mongoose");
const { Schema } = mongoose;

let companiesSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    locationDetails: [{
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
    }],
    companyLogo: {
      type: String, // Assuming the logo will be stored as a file path or URL
    },
    notesHistory: {
      type: Array
    },
  },
  { timestamps: true }
);

let companies = mongoose.model("companies", companiesSchema);
module.exports = companies;
