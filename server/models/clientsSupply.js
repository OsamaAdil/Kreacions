const mongoose = require("mongoose");
const { Schema } = mongoose;

let clientsSupplySchema = new Schema(
  {
    clientID: {
      type: mongoose.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    metalID: {
        type: mongoose.Types.ObjectId,
        ref: "metals",
        required: true,
      },
    middleAgentID: {
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
    currency: {
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

let clientsSupply = mongoose.model("clientsSupply", clientsSupplySchema);
module.exports = clientsSupply;
