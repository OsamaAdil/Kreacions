const Transaction = require("../models/transactions");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createTransaction = function (data, cb){
  if (!data.body.clientId || !data.body.companyId ) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let TransactionPayload = {
    clientId: data.body.clientId,
    companyId: data.body.companyId,
    vendorId: data.body.vendorId,
    metalId: data.body.metalDetails.metalId
  };

  let CreateTransactionPayload = {
    companyId: data.body.companyId,
    clientId: data.body.clientId,
    date: data.body.date,
    orderType: data.body.orderType,
    type: data.body.type,
    vendorId: data.body.vendorId,
    metalDetails: {
      metalId: data.body.metalDetails.metalId,
      metalPriceAtTransaction: data.body.metalDetails.metalPriceAtTransaction,
      metalQuantity: data.body.metalDetails.metalQuantity,
      purityPercentage: data.body.metalDetails.purityPercentage,
    },
    middleAgentId: data.body.middleAgentId,
    currency: data.body.currency,
    transactionType: data.body.transactionType,
    bankTransactionId: data.body.bankTransactionId,
    actualAmount: data.body.actualAmount,
    discountPercentage: data.body.discountPercentage,
    commissionValue: data.body.commissionValue,
    transactionStatus: data.body.transactionStatus,
    commissionPaidStatus: data.body.commissionPaidStatus,
    metalStatusUpdate: data.body.metalStatusUpdate,
    notesHistory: data.body.notesHistory,
  };

  Transaction.findOne(TransactionPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Transaction.create(CreateTransactionPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createTransaction = createTransaction;

// Get
const getTransaction = function (data, cb) {
  let findData = { };
  Transaction.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched details", resp, false))
  });
};
exports.getTransaction = getTransaction;

// Update
const editTransaction = function (data, cb) {
  if (!data.body.transactionId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.transactionId };
  
  let updateTransactionPayload = {
    companyId: data.body.companyId,
    clientId: data.body.clientId,
    date: data.body.date,
    orderType: data.body.orderType,
    type: data.body.type,
    vendorId: data.body.vendorId,
    metalDetails: {
      metalId: data.body.metalDetails.metalId,
      metalPriceAtTransaction: data.body.metalDetails.metalPriceAtTransaction,
      metalQuantity: data.body.metalDetails.metalQuantity,
      purityPercentage: data.body.metalDetails.purityPercentage,
    },
    middleAgentId: data.body.middleAgentId,
    currency: data.body.currency,
    transactionType: data.body.transactionType,
    bankTransactionId: data.body.bankTransactionId,
    actualAmount: data.body.actualAmount,
    discountPercentage: data.body.discountPercentage,
    commissionValue: data.body.commissionValue,
    transactionStatus: data.body.transactionStatus,
    commissionPaidStatus: data.body.commissionPaidStatus,
    metalStatusUpdate: data.body.metalStatusUpdate,
    notesHistory: data.body.notesHistory
  };
  
  let options = { new: true };

  Transaction.findOneAndUpdate(query, updateTransactionPayload, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true));
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false));
  });
};
exports.editTransaction = editTransaction;

// Delete
const deleteTransaction = function (data, cb) {
  if (!data.body.transactionId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.transactionId };
  let updateVendorsBuy = {
    isActive: false,
  };
  let options = { new: true };

  Transaction.findOneAndUpdate(query, updateVendorsBuy, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteTransaction = deleteTransaction;
