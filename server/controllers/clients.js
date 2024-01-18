const Client = require("../models/clients");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createClient = function (data, cb){
  if (!data.body.name ) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let ClientPayload = {
    name: rectifyName(data.body.name)
  };

  let CreateClientPayload = {
    clientType: data.body.clientType,
    clientCategory:  data.body.clientCategory,
    name: rectifyName(data.body.name),
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    companyName: data.body.companyName,
    address: data.body.address,
    accountNumber: data.body.accountNumber,
    listOfCurrencies: data.body.listOfCurrencies || [],
    country: data.body.country,
    notesHistory: data.body.notesHistory || []
  };

  Client.findOne(ClientPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Client.create(CreateClientPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createClient = createClient;


// Get
const getClients = function (data, cb) {
  let findData = { };
  Client.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched vendor details", resp, false))
  });
};
exports.getClients = getClients;

// Update
const editClient = function (data, cb) {
  if (!data.body.clientId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.clientId };
  
  let updateClientPayload = {
    name: data.body.name,
    clientType: data.body.clientType,
    clientCategory:  data.body.clientCategory,
    name: rectifyName(data.body.name),
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    companyName: data.body.companyName,
    address: data.body.address,
    accountNumber: data.body.accountNumber,
    listOfCurrencies: data.body.listOfCurrencies || [],
    isActive: data.body.isActive,
    country: data.body.country,
    notesHistory: data.body.notesHistory || []
    };

  let options = { new: true };

  Client.findOneAndUpdate(query, updateClientPayload, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true));
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false));
  });
};
exports.editClient = editClient;

// Delete
const deleteClient = function (data, cb) {

  if (!data.body.clientId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.clientId };
  let updateClient = {
    isActive: false,
  };
  let options = { new: true };

  Client.findOneAndUpdate(query, updateClient, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteClient = deleteClient;
