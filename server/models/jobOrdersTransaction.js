const mongoose = require("mongoose");
const { Schema } = mongoose;

let jobOrdersTransactionSchema = new Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "company",
      required: true,
    },
    clientId: {
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
    metalId: {
      type: mongoose.Types.ObjectId,
      ref: "metals",
      required: true,
    },
    metalPriceAtTransaction: {
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

let jobOrdersTransaction = mongoose.model("jobOrdersTransaction", jobOrdersTransactionSchema);
module.exports = jobOrdersTransaction;
