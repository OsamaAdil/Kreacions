const JobOrdersTransaction = require("../models/jobOrdersTransaction");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createJobOrdersTransaction = function (data, cb) {
  if (!data.body.clientId || !data.body.companyId || !data.body.middleAgentId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let JobOrdersTransactionPayload = {
    clientId: data.body.clientId,
    companyId: data.body.companyId,
    middleAgentId: data.body.middleAgentId,
    bankTransactionId: data.body.bankTransactionId
  };

  let CreateJobOrdersTransactionPayload = {
    companyId: data.body.companyId,
    clientId: data.body.clientId,
    date: data.body.date,
    orderType: data.body.orderType,
    jobOrderPercentage: data.body.jobOrderPercentage,
    totalOrderPrice: data.body.totalOrderPrice,
    metalId: data.body.metalId,
    metalPriceAtTransaction: data.body.metalPriceAtTransaction,
    metalQuantity: data.body.metalQuantity,
    purityPercentage: data.body.purityPercentage,
    currency: data.body.currency,
    middleAgentId: data.body.middleAgentId,
    transactionType: data.body.transactionType,
    bankTransactionId: data.body.bankTransactionId,
    commissionPercentage: data.body.commissionPercentage,
    status: data.body.status,
    commissionPaidStatus: data.body.commissionPaidStatus,
    metalStatusUpdate: data.body.metalStatusUpdate,
    notesHistory: data.body.notesHistory || [],
  };

  JobOrdersTransaction.findOne(JobOrdersTransactionPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    JobOrdersTransaction.create(CreateJobOrdersTransactionPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });

};
exports.createJobOrdersTransaction = createJobOrdersTransaction;


// Get
const getJobOrdersTransaction = function (data, cb) {
  let findData = { };
  JobOrdersTransaction.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched JobOrdersTransaction details", resp, false))
  });
};
exports.getJobOrdersTransaction = getJobOrdersTransaction;

// Update
const editJobOrdersTransaction = function (data, cb) {

  if (!data.body.jobOrdersTransactionId) {
    return cb(resStr(400, "Please add required details", null, true));
  }
  
  let query = { _id : data.body.jobOrdersTransactionId };
  
  let updateJobOrdersTransaction = {
    companyId: data.body.companyId,
    clientId: data.body.clientId,
    date: data.body.date,
    orderType: data.body.orderType,
    jobOrderPercentage: data.body.jobOrderPercentage,
    totalOrderPrice: data.body.totalOrderPrice,
    metalId: data.body.metalId,
    metalPriceAtTransaction: data.body.metalPriceAtTransaction,
    metalQuantity: data.body.metalQuantity,
    purityPercentage: data.body.purityPercentage,
    currency: data.body.currency,
    middleAgentId: data.body.middleAgentId,
    transactionType: data.body.transactionType,
    bankTransactionId: data.body.bankTransactionId,
    commissionPercentage: data.body.commissionPercentage,
    status: data.body.status,
    commissionPaidStatus: data.body.commissionPaidStatus,
    metalStatusUpdate: data.body.metalStatusUpdate,
    isActive: data.body.isActive,
    notesHistory: data.body.notesHistory || [],
  };

  let options = { new: true };

  JobOrdersTransaction.findOneAndUpdate(query, updateJobOrdersTransaction, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true));
    }
    return cb(null, resStr(200, "updated data succesfully", resp, false));
  });
};
exports.editJobOrdersTransaction = editJobOrdersTransaction;

// Delete
const deleteJobOrdersTransaction = function (data, cb) {
  if (!data.body.jobOrdersTransactionId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let query = { _id : data.body.jobOrdersTransactionId };
  let updateJobOrdersTransaction = {
    isActive: false,
  };
  let options = { new: true };

  JobOrdersTransaction.findOneAndUpdate(query, updateJobOrdersTransaction, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteJobOrdersTransaction = deleteJobOrdersTransaction;
