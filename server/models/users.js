const mongoose = require("mongoose");
const { Schema } = mongoose;

let usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    companyIds: {
      type: [mongoose.Types.ObjectId],
      ref: "companies",
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
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

let users = mongoose.model("users", usersSchema);
module.exports = users;
