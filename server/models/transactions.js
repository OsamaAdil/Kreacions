const mongoose = require("mongoose");
const { Schema } = mongoose;

let transactionsSchema = new Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "companies",
      // required: true
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      // required: true,
    },
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "clients",
      // required: true,
    },
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "vendors",
      // required: true
    },
    metalDetails: {
        _id: false,
        metalId: {
          type: mongoose.Types.ObjectId,
          ref: "metals",
          required: true
        },
        metalPriceAtTransaction: {
          type: Number,
          required: true,
        },
        metalQuantity: {
          type: Number,
          required: true
        },
        purityPercentage: {
          type: Number,
        },
      },
    middleAgentId: {
      type: mongoose.Types.ObjectId,
      ref: "middleAgents",
    },
    currency: {
      type: String,
    },
    transactionType: {
      type: String,
    },
    bankTransactionId: {
      type: String,
    },
    actualAmount: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    commissionValue: {
      type: Number,
    },
    transactionStatus: {
      type: String,
    },
    commissionPaidStatus: {
      type: String,
    },
    metalStatusUpdate: {
      type: String,
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

transactionsSchema.virtual('pureMetalQuantity').get(function () {
    return (this.metalDetails.metalQuantity) *(this.metalDetails.purity);
  });

transactionsSchema.virtual('finalAmount').get(function () {
    return (this.actualAmount) - (this.actualAmount.discountPercentage) - (this.commissionValue);
  });

let transactions = mongoose.model("transactions", transactionsSchema);
module.exports = transactions;
