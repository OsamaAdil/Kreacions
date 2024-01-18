const VendorsBuy = require("../models/vendorsBuy");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createVendorsBuy = function (data, cb) {
  if (!data.body.metalId || !data.body.vendorId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let VendorsBuyPayload = {
    metalId: data.body.metalId,
    vendorId: data.body.vendorId,
    discountType: data.body.discountType
  };

  let CreateVendorsBuyPayload = {
    metalId: data.body.metalId,
    vendorId: data.body.vendorId,
    discountType: data.body.discountType,
    discountPercentage: data.body.discountPercentage,
    middleAgentId: data.body.middleAgentId,
    commissionPercentage: data.body.commissionPercentage,
    notesHistory: data.body.notesHistory || []
  };

  VendorsBuy.findOne(VendorsBuyPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    VendorsBuy.create(CreateVendorsBuyPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createVendorsBuy = createVendorsBuy;


// Get
const getVendorsBuy = function (data, cb) {
  let findData = { };
  Vendorsbuy.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched vendorsbuy details", resp, false))
  });
};
exports.getVendorsBuy = getVendorsBuy;

// Update
const editVendorsBuy = function (data, cb) {
  if (!data.body.vendorsBuyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.vendorsBuyId };
  
  let updateVendorsBuy = {
    metalId: data.body.metalId,
    vendorId: data.body.vendorId,
    discountType: data.body.discountType,
    discountPercentage: data.body.discountPercentage,
    middleAgentId: data.body.middleAgentId,
    commissionPercentage: data.body.commissionPercentage,
    notesHistory: data.body.notesHistory || []
  };

  let options = { new: true };

  VendorsBuy.findOneAndUpdate(query, updateVendorsBuy, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true));
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false));
 });
};

exports.editVendorsBuy = editVendorsBuy;

// Delete
const deleteVendorsBuy = function (data, cb) {
  if (!data.body.vendorsBuyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.vendorsBuyId };
  let updateVendorsBuy = {
    isActive: false,
  };
  let options = { new: true };

  VendorsBuy.findOneAndUpdate(query, updateVendorsBuy, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteVendorsBuy = deleteVendorsBuy;
