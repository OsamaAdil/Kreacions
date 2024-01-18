const Clientssupply = require("../models/clientsSupply");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createClientsSupply = function (data, cb) {
  if (!data.body.clientId || !data.body.metalId || !data.body.middleAgentId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let ClientsSupplyPayload = {
    clientId: data.body.clientId,
    metalId: data.body.metalId,
    middleAgentId: data.body.middleAgentId
  };

  let CreateClientsSupplyPayload = {
    clientId: data.body.clientId,
    metalId: data.body.metalId,
    middleAgentId: data.body.middleAgentId,
    commissionPercentage: data.body.commissionPercentage,
    discountPercentage: data.body.discountPercentage,
    discountType: data.body.discountType,
    listOfCurrencies: data.body.listOfCurrencies || [],
    isActive: data.body.isActive,
    notesHistory: data.body.notesHistory || []
  };

  Clientssupply.findOne(ClientsSupplyPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Clientssupply.create(CreateClientsSupplyPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });

};
exports.createClientsSupply = createClientsSupply;

// Get
const getClientsSupply = function (data, cb) {
  let findData = { };
  Clientssupply.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched clientssupply details", resp, false))
  });
};
exports.getClientsSupply = getClientsSupply;

// Update
const editClientsSupply = function (data, cb) {
  if (!data.body.clientSupplyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.clientSupplyId };
  
  let updateClientsSupply = {
    clientId: data.body.clientId,
    metalId: data.body.metalId,
    middleAgentId: data.body.middleAgentId,
    commissionPercentage: data.body.commissionPercentage,
    discountPercentage: data.body.discountPercentage,
    discountType: data.body.discountType,
    listOfCurrencies: data.body.listOfCurrencies || [],
    isActive: data.body.isActive,
    notesHistory: data.body.notesHistory || []
  };

  let options = { new: true };

  Clientssupply.findOneAndUpdate(query, updateClientsSupply, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true));
    }
    return cb(null, resStr(200, "updated data succesfully", resp, false));
   });
};
exports.editClientsSupply = editClientsSupply;

// Delete
const deleteClientsSupply = function (data, cb) {
  if (!data.body.clientSupplyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.clientSupplyId };
  let updateClientsSupply = {
    isActive: false,
  };
  let options = { new: true };

  Clientssupply.findOneAndUpdate(query, updateClientsSupply, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteClientsSupply = deleteClientsSupply;
