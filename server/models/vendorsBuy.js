const mongoose = require("mongoose");
const { Schema } = mongoose;

let vendorsBuySchema = new Schema(
  {
    metalId: {
      type: mongoose.Types.ObjectId,
      // ref: "metals",
      required: true,
    },
    vendorId: {
      type: mongoose.Types.ObjectId,
      // ref: "vendors",
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
    middleAgentId: {
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

let vendorsBuy = mongoose.model("vendorsBuy", vendorsBuySchema);
module.exports = vendorsBuy;
