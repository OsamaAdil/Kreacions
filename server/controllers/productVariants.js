const ProductVariants = require("../models/productVariants");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createProductVariants = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (
    !req.body.productId ||
    !req.body.size ||
    !req.body.colour ||
    !req.body.length ||
    !req.body.width ||
    !req.body.height
    ) {
    sendRes.message = "Please add the required data";
    return res.status(400).send(sendRes);
  }

  let ProductVariantsPayload = {
    productId: req.body.productId,
    size: req.body.size,
    colour: req.body.colour,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height
  };
  
  ProductVariants.create(ProductVariantsPayload, (err, resp) => {
    if (err) {
      return res.status(500).send(sendRes);
    }
    sendRes.message = "inserted succesfully";
    sendRes.error = false;
    return res.status(200).send(sendRes);
  });

};
exports.createProductVariants = createProductVariants;

// Get
const getProductVariants = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: [],
  };

  let findData = { };

  ProductVariants.find(findData, (err, resp) => {
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
exports.getProductVariants = getProductVariants;

// Update
const editProductVariants = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (
    !req.body.productVariantId  ||
    !req.body.productId ||
    !req.body.size ||
    !req.body.colour ||
    !req.body.length ||
    !req.body.width ||
    !req.body.height
) {
    sendRes.message = "Bad request from user";
    return res.status(400).send(sendRes);
  }
  
  let query = { _id: req.body.productVariantId }; 
  
  let updateProductVariants = {
    productId: req.body.productId,
    size: req.body.size,
    colour: req.body.colour,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    isDelete: req.body.isDelete
  };

  let options = { new: true };

  ProductVariants.findOneAndUpdate(query, updateProductVariants, options, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `updated data succesfully`;
    sendRes.data = resp;
    sendRes.error = false;
    return res.status(200).send(sendRes);
  });
};
exports.editProductVariants = editProductVariants;

// Delete
const deleteProductVariants = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
  };

  if (!req.body.productVariantId) {
    sendRes.message = "Data not provided to delete the data!";
    return res.status(400).send(sendRes);
  }

  let query = { _id: req.body.productVariantId };

  let updateProductVariants = {
    isDelete: true,
  };

  ProductVariants.findOneAndUpdate(query, updateProductVariants, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `deleted succesfully`;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.deleteProductVariants = deleteProductVariants;
