const Customers = require("../models/customers");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createCustomers = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (!req.body.fullName || !req.body.phoneNumber || !req.body.address  || !req.body.landmark || !req.body.pincode || !req.body.city || !req.body.state ) {
    sendRes.message = "Please add the required data";
    return res.status(400).send(sendRes);
  }

  let customersPayload = {
    fullName : req.body.fullName,
    phoneNumber : req.body.phoneNumber,
    address : req.body.address,
    landmark : req.body.landmark, 
    pincode: req.body.pincode,
    city: req.body.city, 
    state: req.body.state
  };
  
  Customers.create(customersPayload, (err, resp) => {
    if (err) {
      return res.status(500).send(sendRes);
    }
    sendRes.message = "inserted succesfully";
    sendRes.error = false;
    return res.status(200).send(sendRes);
  });

};
exports.createCustomers = createCustomers;

// Get
const getCustomers = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: [],
  };

  let findData = { isDelete: false };

  Customers.find(findData, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = "fetched succesfully";
    sendRes.error = false;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.getCustomers = getCustomers;

// Update
const editCustomers = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (!req.body.fullName || !req.body.phoneNumber || !req.body.address  || !req.body.landmark || !req.body.pincode || !req.body.city || !req.body.state || !req.body.customerId ) {
    sendRes.message = "Bad request from user";
    return res.status(400).send(sendRes);
  }
  
  let query = { _id: req.body.customerId };
  
  let updatecustomers = {
    fullName : req.body.fullName,
    phoneNumber : req.body.phoneNumber,
    address : req.body.address,
    landmark : req.body.landmark, 
    pincode: req.body.pincode,
    city: req.body.city, 
    state: req.body.state
  };

  let options = { new: true };

  Customers.findOneAndUpdate(query, updatecustomers, options, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `updated data succesfully`;
    sendRes.error = false;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.editCustomers = editCustomers;

// Delete
const deleteCustomers = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
  };

  if (!req.body.customerId) {
    sendRes.message = "Data not provided to delete the data!";
    return res.status(400).send(sendRes);
  }

  let query = { _id: req.body.customerId };

  let updatecustomers = {
    isDelete: true,
  };

  Customers.findOneAndUpdate(query, updatecustomers, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `deleted succesfully`;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.deleteCustomers = deleteCustomers;
