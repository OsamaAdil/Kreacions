const mongoose = require("mongoose");
const { Schema } = mongoose;

let transactionsSchema = new Schema(
  {
    companyDetails: {
      _id: false,
      companyId: {
        type: mongoose.Types.ObjectId,
        ref: "locations",
      },
      locationId: {
        type: mongoose.Types.ObjectId,
        ref: "locations",
      },
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    clientID: {
      type: mongoose.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    vendorID: {
      type: mongoose.Types.ObjectId,
      ref: "vendors",
      required: true
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
    middleAgentID: {
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
