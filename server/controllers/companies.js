const Company = require("../models/companies");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createCompany = function (data, cb) {
  if (!data.body.name) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let CompanyPayload = {
    name: rectifyName(data.body.name)
  };

  let CreateCompanyPayload = {
    name: rectifyName(data.body.name),
    locationDetails: data.body.locationDetails,
    // companyLogo: {
    //   imageData: req.body.buffer, // to be changed to file later
    //   contentType: req.body.mimetype, // to be changed to file later
    // }
    notesHistory: data.body.notesHistory
  };

  Company.findOne(CompanyPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Company.create(CreateCompanyPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating company", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });

};
exports.createCompany = createCompany;


// Get
const getCompany = function (data, cb) {
  let findData = { };
  Company.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched company details", resp, false))
  });
};
exports.getCompany = getCompany;

// Update

const editCompany = function (data, cb) {
  if (!data.body.companyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.companyId };
  
  let updateCompany = {
    name: data.body.name,
    locationDetails: data.body.locationDetails,
    isActive: data.body.isActive,
    notesHistory: data.body.notesHistory
  };

  let options = { new: true };

  Company.findOneAndUpdate(query, updateCompany, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "updated data succesfully", resp, false))
  });
};
exports.editCompany = editCompany;

// Delete
const deleteCompany = function (data, cb) {
  if (!data.body.companyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.companyId };
  let updateCompany = {
    isActive: false,
  };
  let options = { new: true };

  Company.findOneAndUpdate(query, updateCompany, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteCompany = deleteCompany;

