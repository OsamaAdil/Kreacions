const mongoose = require("mongoose");
const { Schema } = mongoose;

let clientsSupplySchema = new Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    metalId: {
      type: mongoose.Types.ObjectId,
      ref: "metals",
      required: true,
    },
    middleAgentId: {
      type: mongoose.Types.ObjectId,
      ref: "middleAgents",
    },
    commissionPercent: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    discountType: {
      type: String,
      enum: ["metal", "price"],
    },
    listOfCurrencies: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
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

let clientsSupply = mongoose.model("clientsSupply", clientsSupplySchema);
module.exports = clientsSupply;
