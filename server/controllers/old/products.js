const Products = require("../models/Products");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createProducts = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: [],
  };

  if (
    !req.body.genreId ||
    !req.body.categoryId ||
    !req.body.commentId ||
    !req.body.title ||
    !req.body.price ||
    !req.body.discountPercent ||
    !req.body.material ||
    !req.body.pattern ||
    !req.body.type ||
    !req.body.occasion ||
    !req.body.flag ||
    !req.body.shortDescription ||
    !req.body.longDescription ||
    !req.body.defaultImage ||
    !req.body.images ||
    !req.body.video ||
    !req.body.rating ||
    !req.body.noOfRatings ||
    !req.body.noOfReviews
  ) {
    sendRes.message = "Please add all required details for basic product";
    return res.status(400).send(sendRes);
  }

  let productBasicPayload = {
    genreId: req.body.genreId || null,
    categoryId: req.body.categoryId || null,
    commentId: req.body.commentId || null,
    title: req.body.title,
    price: req.body.price || 0,
    discountPercent: req.body.discountPercent || 0,
    material: req.body.material || null,
    pattern: req.body.pattern || null,
    type: req.body.type || null,
    occasion: req.body.occasion || null,
    flag: req.body.flag || null,
    shortDescription: req.body.shortDescription || null,
    longDescription: req.body.longDescription || null,
    defaultImage: req.body.defaultImage || null,
    images: req.body.images || [],
    video: req.body.video || null,
    rating: req.body.rating || 0,
    noOfRatings: req.body.noOfRatings || 0,
    noOfReviews: req.body.noOfReviews || 0,
  };
  

  Products.create(productBasicPayload, (err, resp) => {
    if (err) {
      return res.status(500).send(sendRes);
    }
    sendRes.message ="inserted succesfully";
    sendRes.error = false;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.createProducts = createProducts;

// Get
const getProducts = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: [],
  };

  let findData = {};

  Products.find(findData, (err, resp) => {
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
exports.getProducts = getProducts;

// Update
const editProducts = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (
    !req.body.productId  ||
    !req.body.genreId ||
    !req.body.categoryId ||
    !req.body.commentId ||
    !req.body.title ||
    !req.body.price ||
    !req.body.discountPercent ||
    !req.body.material ||
    !req.body.pattern ||
    !req.body.type ||
    !req.body.occasion ||
    !req.body.flag ||
    !req.body.shortDescription ||
    !req.body.longDescription ||
    !req.body.defaultImage ||
    !req.body.images ||
    !req.body.video ||
    !req.body.rating ||
    !req.body.noOfRatings ||
    !req.body.noOfReviews
    ) {
    sendRes.message = "Bad request from user";
    return res.status(400).send(sendRes);
  }
  
  let query = { _id: req.body.productId }; 
  
  let updateProducts = {
    genreId: req.body.genreId,
    categoryId: req.body.categoryId,
    commentId: req.body.commentId,
    title: req.body.title,
    price: req.body.price,
    discountPercent: req.body.discountPercent,
    material: req.body.material,
    pattern: req.body.pattern,
    type: req.body.type,
    occasion: req.body.occasion,
    flag: req.body.flag,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    defaultImage: req.body.defaultImage,
    images: req.body.images,
    video: req.body.video,
    rating: req.body.rating,
    noOfRatings: req.body.noOfRatings,
    noOfReviews: req.body.noOfReviews
  };

  let options = { new: true };

  Products.findOneAndUpdate(query, updateProducts, options, (err, resp) => {
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
exports.editProducts = editProducts;

// Delete
const deleteProducts = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
  };

  if (!req.body.productId) {
    sendRes.message = "Data not provided to delete the data!";
    return res.status(400).send(sendRes);
  }

  let query = { _id: req.body.productId };

  let updateProducts = {
    isDelete: true,
  };

  Products.findOneAndUpdate(query, updateProducts, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `deleted succesfully`;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.deleteProducts = deleteProducts;
