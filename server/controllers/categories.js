const Category = require("../models/categories");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createCategory = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: [],
  };

  if (!req.body.name) {
    sendRes.message = "Please add the name";
    return res.status(400).send(sendRes);
  }

  let CategoryPayload = {
    name: rectifyName(req.body.name),
  };

  Category.findOne(CategoryPayload, (err, resp) => {
    if (err) {
      
      sendRes.message = "Error in finding";
      return res.status(500).send(sendRes);
    }
    if (resp) {
      sendRes.message = "Already exists";
      return res.status(400).send(sendRes);
    }
    Category.create(CategoryPayload, (errC, resC) => {
      if (errC) {
        return res.status(500).send(sendRes);
      }
      sendRes.message = "Inserted succesfully";
      sendRes.error = false;
      return res.status(200).send(sendRes);
    });
  });

};
exports.createCategory = createCategory;

// Get
const getCategory = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  let findData = { isActive: true };
  let projection = {
    name: 1,
    _id: 1,
  };

  Category.find(findData, projection, (err, resp) => {
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
exports.getCategory = getCategory;

// Update
const editCategory = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: [],
  };

  if (!req.body.name && !req.body.categoryId) {
    sendRes.message = "Bad request";
    return res.status(400).send(sendRes);
  }
  
  let query = { _id : req.body.categoryId };
  
  let updateCategory = {
    name: rectifyName(req.body.name),
  };

  let options = { new: true };

  Category.findOneAndUpdate(query, updateCategory, options, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `updated data with new name ${req.body.name} succesfully`;
    sendRes.data = resp;
    sendRes.error = false;
    return res.status(200).send(sendRes);
  });
};
exports.editCategory = editCategory;

// Delete
const deleteCategory = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
  };

  if (!req.body.categoryId) {
    sendRes.message = "Name not provided to delete the data!";
    return res.status(400).send(sendRes);
  }

  let query = { _id : req.body.categoryId };

  let updateCategory = {
    isActive: false,
  };

  Category.findOneAndUpdate(query, updateCategory, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `${req.body.name} deleted succesfully`;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.deleteCategory = deleteCategory;
