const Metal = require("../models/metals");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createMetal = function (data, cb){
  if (!data.body.name ) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let MetalPayload = {
    name: rectifyName(data.body.name)
  };

  let CreateMetalPayload = {
    name: data.body.name,
    totalPureMetal: data.body.totalPureMetal,
    totalMoneyVested: data.body.totalMoneyVested,
    totalValueBasedOnCurrentPrice: data.body.totalValueBasedOnCurrentPrice
  };

  Metal.findOne(MetalPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Metal.create(CreateMetalPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createMetal = createMetal;

// Get
const getMetals = function (data, cb) {
  let findData = { };
  Metal.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched Metal details", resp, false))
  });
};
exports.getMetals = getMetals;

// Update
const editMetal = function (data, cb) {
  if (!data.body.metalId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.metalId };
  
  let updateMetalPayload = {
    name: data.body.name,
    totalPureMetal: data.body.totalPureMetal,
    totalMoneyVested: data.body.totalMoneyVested,
    totalValueBasedOnCurrentPrice: data.body.totalValueBasedOnCurrentPrice,
    isActive: data.body.isActive
    };

  let options = { new: true };

  Metal.findOneAndUpdate(query, updateMetalPayload, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true));
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false));
  });
};
exports.editMetal = editMetal;

// Delete
const deleteMetal = function (data, cb) {
  if (!data.body.metalId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.metalId };
  let updateMetal = {
    isActive: false,
  };
  let options = { new: true };

  Metal.findOneAndUpdate(query, updateMetal, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteMetal = deleteMetal;
