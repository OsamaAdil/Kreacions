const Vendor = require("../models/vendors");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createVendor = function (data, cb) {
  if (!data.body.name) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let VendorPayload = {
    name: rectifyName(data.body.name)
  };

  let CreateVendorPayload = {
    vendorType: data.body.vendorType,
    name: rectifyName(data.body.name),
    companyName: data.body.companyName,
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    address: data.body.address,
    listOfCurrencies: data.body.listOfCurrencies || [],
    country: data.body.country,
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

  Vendor.findOne(VendorPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Vendor.create(CreateVendorPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating company", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createVendor = createVendor;


// Get
const getVendor = function (data, cb) {
  let findData = { };
  Vendor.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched vendor details", resp, false))
  });
};
exports.getVendor = getVendor;


// Update
const editVendor = function (data, cb) {
  if (!data.body.vendorId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.vendorId };
  
  let updateVendor = {
    vendorType: data.body.vendorType,
    name: rectifyName(data.body.name),
    companyName: data.body.companyName,
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    address: data.body.address,
    listOfCurrencies: data.body.listOfCurrencies || [],
    country: data.body.country,
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

  Vendor.findOneAndUpdate(query, updateVendor, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true))
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false))
 });
};
exports.editVendor = editVendor;

// Delete
const deleteVendor = function (data, cb) {
  if (!data.body.vendorId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.vendorId };
  let updateVendor = {
    isActive: false,
  };
  let options = { new: true };

  Vendor.findOneAndUpdate(query, updateVendor, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteVendor = deleteVendor;
