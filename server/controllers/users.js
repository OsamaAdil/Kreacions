const Users = require("../models/users");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createUser = function (data, cb) {
  if (!data.body.name || !data.body.email || !data.body.phoneNumber) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let UserPayload = {
    email: rectifyName(data.body.email),
  };

  let CreateUserPayload = {
    name: rectifyName(data.body.name),
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    role: data.body.role,  
    notesHistory: data.body.notesHistory || [],
    companyIds: data.body.companyIds || []
  };

  Users.findOne(UserPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Users.create(CreateUserPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createUser = createUser;


// Get
const getUsers = function (data, cb) {
  let findData = { };
  Users.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched Users details", resp, false))
  });
};
exports.getUsers = getUsers;

// Update
const editUser = function (data, cb) {
  if (!data.body.userId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.userId };
  let updateUser = {
    name: rectifyName(data.body.name),
    phoneNumber: data.body.phoneNumber,
    email: data.body.email,
    role: data.body.role,  
    notesHistory: data.body.notesHistory || [],
    isActive: data.body.isActive,
    companyIds: data.body.companyIds || []
  };
  let options = { new: true };

  Users.findOneAndUpdate(query, updateUser, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true));
    }
    return cb(null, resStr(200, "updated data succesfully", resp, false));
   });
};
exports.editUser = editUser;

// Delete
const deleteUser = function (data, cb) {
  if (!data.body.userId) {
    return cb(resStr(400, "Please add required details", null, true))
  }

  let query = { _id : data.body.userId };
  let updateUser = {
    isActive: false,
  };
  let options = { new: true };

  Users.findOneAndUpdate(query, updateUser, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteUser = deleteUser;
