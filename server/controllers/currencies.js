const Currency = require("../models/currencies");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createCurrency = function (data, cb) {
  if (!data.body.name) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let CurrencyPayload = {
    name: rectifyName(data.body.name)
  };

  let CreateCurrencyPayload = {
    name: rectifyName(data.body.name),
    country: data.body.country,
    currencyIcon: data.body.currencyIcon
  };

  Currency.findOne(CurrencyPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Currency.create(CreateCurrencyPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating company", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createCurrency = createCurrency;

// Get
const getCurrency = function (data, cb) {
  let findData = {};
  
  if (!data.admin) {
    findData = { 
      isActive: true,
      isDelete: false
    };
  }

  Currency.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched currency details", resp, false))
  });
};
exports.getCurrency = getCurrency;

// Update
const editCurrency = function (data, cb) {
  if (!data.body.currencyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.currencyId };
  
  let updateCurrency = {
    name: data.body.name,
    country: data.body.country,
    isActive: data.body.isActive
  };

  let options = { new: true };

  Currency.findOneAndUpdate(query, updateCurrency, options, (err, resp) => {
    if (err) {
     return cb(resStr(500, "Server error while fetching details from server", null, true))
   }
   return cb(null, resStr(200, "updated data succesfully", resp, false))
 });
};
exports.editCurrency = editCurrency;

// Delete
const deleteCurrency = function (data, cb) {
  if (!data.body.currencyId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.currencyId };
  let updateCurrency = {
    isActive: false,
  };
  let options = { new: true };

  Currency.findOneAndUpdate(query, updateCurrency, options, (err, resp) => {
     if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteCurrency = deleteCurrency;
