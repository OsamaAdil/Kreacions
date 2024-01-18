const MiddleAgent = require("../models/middleAgents");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createMiddleAgent = function (data, cb) {
  if (!data.body.name) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let MiddleAgentPayload = {
    name: rectifyName(data.body.name)
  };

  let CreateMiddleAgentPayload = {
    name: rectifyName(data.body.name),
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    address: data.body.address,
    country: data.body.country,
    isActive : data.body.isActive,
    photo: data.body.photo,
    listOfCurrencies: data.body.listOfCurrencies || [],
    accountDetails: {
      bankName: data.body.accountDetails.bankName,
      accountName: data.body.accountDetails.accountName,
      accountNumber: data.body.accountDetails.accountNumber,
      IFSCCode: data.body.accountDetails.IFSCCode,
      branchName: data.body.accountDetails.branchName,
      swiftCode: data.body.accountDetails.swiftCode,
    },
    notesHistory: data.body.notesHistory || [],
  };

  MiddleAgent.findOne(MiddleAgentPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    MiddleAgent.create(CreateMiddleAgentPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createMiddleAgent = createMiddleAgent;


// Get
const getMiddleAgent = function (data, cb) {
  let findData = { };
  MiddleAgent.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched MiddleAgent details", resp, false))
  });
};
exports.getMiddleAgent = getMiddleAgent;


// Update
const editMiddleAgent = function (data, cb) {
  if (!data.body.middleAgentId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.middleAgentId };
  
  let updateMiddleAgent = {
    name: rectifyName(data.body.name),
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    address: data.body.address,
    country: data.body.country,
    isActive : data.body.isActive,
    photo: data.body.photo,
    listOfCurrencies: data.body.listOfCurrencies || [],
    accountDetails: {
      bankName: data.body.accountDetails.bankName,
      accountName: data.body.accountDetails.accountName,
      accountNumber: data.body.accountDetails.accountNumber,
      IFSCCode: data.body.accountDetails.IFSCCode,
      branchName: data.body.accountDetails.branchName,
      swiftCode: data.body.accountDetails.swiftCode,
    },
    notesHistory: data.body.notesHistory || [],
  };

  let options = { new: true };

  MiddleAgent.findOneAndUpdate(query, updateMiddleAgent, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true));
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false));
 });
};

exports.editMiddleAgent = editMiddleAgent;

// Delete
const deleteMiddleAgent = function (data, cb) {
  if (!data.body.middleAgentId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.middleAgentId };
  let updateMiddleAgent = {
    isActive: false,
  };
  let options = { new: true };

  MiddleAgent.findOneAndUpdate(query, updateMiddleAgent, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteMiddleAgent = deleteMiddleAgent;
