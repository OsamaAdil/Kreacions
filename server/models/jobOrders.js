const mongoose = require("mongoose");
const { Schema } = mongoose;

let jobOrderSchema = new Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "company",
      required: true,
    },
    clientID: {
      type: mongoose.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    orderType: {
      type: String,
      enum: ["Commodity", "MakingCharges"],
      required: true,
    },
    jobOrderPercentage: {
      type: Number,
      required: true,
    },
    totalOrderPrice: {
      type: Number,
      required: true,
    },
    metalID: {
      type: mongoose.Types.ObjectId,
      ref: "metals",
      required: true,
    },
    metalCurrentPrice: {
      type: Number,
      required: true,
    },
    metalQuantity: {
      type: Number,
      required: true,
    },
    purityPercentage: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    middleAgentId: {
      type: mongoose.Types.ObjectId,
      ref: "middleAgent",
    },
    transactionType: {
      type: String,
      required: true,
    },
    bankTransactionId: {
      type: String,
    },
    commissionPercentage: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    commissionPaidStatus: {
      type: String,
      required: true,
    },
    metalStatusUpdate: {
      type: String,
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

let jobOrder = mongoose.model("jobOrder", jobOrderSchema);
module.exports = jobOrder;
