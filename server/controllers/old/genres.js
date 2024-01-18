const Genres = require("../models/genres");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createGenres = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (!req.body.name) {
    sendRes.message = "Please add the required data";
    return res.status(400).send(sendRes);
  }

  let genresPayload = {
    name : req.body.name,
    isDelete : false
  };
  
  Genres.create(genresPayload, (err, resp) => {
    if (err) {
      return res.status(500).send(sendRes);
    }
    sendRes.message = "inserted succesfully";
    sendRes.error = false;
    return res.status(200).send(sendRes);
  });

};
exports.createGenres = createGenres;

// Get
const getGenres = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  let findData = {  };

  Genres.find(findData, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = "fetched genre succesfully";
    sendRes.error = false;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.getGenres = getGenres;

// Update
const editGenres = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (!req.body.genreId || !req.body.name ) {
    sendRes.message = "Bad request from user";
    return res.status(400).send(sendRes);
  }
  
  let query = { _id: req.body.genreId }; 
  
  let updateGenres = {
    name : req.body.name
  };

  let options = { new: true };

  Genres.findOneAndUpdate(query, updateGenres, options, (err, resp) => {
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
exports.editGenres = editGenres;

// Delete
const deleteGenres = function (req, res) {
  let sendRes = {
    message: "",
    error: true,
    data: []
  };

  if (!req.body.genreId) {
    sendRes.message = "Sufficient Data not provided to delete!";
    return res.status(400).send(sendRes);
  }

  let query = { _id: req.body.genreId };

  let updateGenres = {
    isDelete: true,
  };

  Genres.findOneAndUpdate(query, updateGenres, (err, resp) => {
    if (err) {
      sendRes.message = "Server error while fectching details from server";
      return res.status(500).send(sendRes);
    }
    sendRes.message = `deleted succesfully`;
    sendRes.error = false;
    sendRes.data = resp;
    return res.status(200).send(sendRes);
  });
};
exports.deleteGenres = deleteGenres;
