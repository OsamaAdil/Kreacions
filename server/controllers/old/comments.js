const Comments = require("../models/comments");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createComments = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (
    !req.body.productId ||
    !req.body.userDetails.name ||
    !req.body.userDetails.postedOn ||
    !req.body.commentDetails.comment ||
    !req.body.commentDetails.rating
    ) {
    sendRes.message = "Please add the required data";
    return res.status(400).send(sendRes);
  }

  let CommentsPayload = {
    productId: req.body.productId,
    userDetails: {
      name: req.body.userDetails.name,
      postedOn: req.body.userDetails.postedOn
    },
    commentDetails: {
      comment: req.body.commentDetails.comment,
      rating: req.body.commentDetails.rating
    }
  };
  
  Comments.create(CommentsPayload, (err, resp) => {
    if (err) {
      return res.status(500).send(sendRes);
    }
    sendRes.message = "inserted succesfully";
    sendRes.error = false;
    return res.status(200).send(sendRes);
  });

};
exports.createComments = createComments;

// Get
const getComments = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  let findData = {};

  Comments.find(findData, (err, resp) => {
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
exports.getComments = getComments;

// Update
const editComments = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (
    !req.body.productId ||
    !req.body.userDetails.name ||
    !req.body.userDetails.postedOn ||
    !req.body.commentDetails.comment ||
    !req.body.commentDetails.rating
    ) {
    sendRes.message = "Bad request from user";
    return res.status(400).send(sendRes);
  }
  
  let query = { _id: req.body.commentId }; 
  
  let updateComments = {
    productId: req.body.productId,
    userDetails: {
      name: req.body.userDetails.name,
      postedOn: req.body.userDetails.postedOn
    },
    commentDetails: {
      comment: req.body.commentDetails.comment,
      rating: req.body.commentDetails.rating
    },
    isDelete: req.body.isDelete
  };

  let options = { new: true };

  Comments.findOneAndUpdate(query, updateComments, options, (err, resp) => {
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
exports.editComments = editComments;

// Delete
const deleteComments = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
  };

  if (  !req.body.commentId ) {
    sendRes.message = "Data not provided to delete the data!";
    return res.status(400).send(sendRes);
  }

  let query = { _id: req.body.commentId };

  let updateComments = {
    isDelete: true,
  };

  Comments.findOneAndUpdate(query, updateComments, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `deleted succesfully`;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.deleteComments = deleteComments;
