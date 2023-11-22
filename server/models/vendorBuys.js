const mongoose = require("mongoose");
const { Schema } = mongoose;

let vendorBuysSchema = new Schema(
  {
    metalId: {
      type: mongoose.Types.ObjectId,
      ref: "metals",
      required: true,
    },
    vendorID: {
      type: mongoose.Types.ObjectId,
      ref: "vendors",
      required: true,
    },
    discountType: {
      type: String,
      enum: ["metal", "price"],
      required: true,
    },
    discountPercentage: {
      type: Number,
    },
    middleAgentID: {
      type: mongoose.Types.ObjectId,
      ref: "middleAgents",
    },
    commissionPercentage: {
      type: Number,
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

let vendorBuys = mongoose.model("vendorBuys", vendorBuysSchema);
module.exports = vendorBuys;
