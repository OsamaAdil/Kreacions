const activityLogs = require("../models/activityLogs");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createActivityLogs = function (data, cb) {
  if (!data.body.userId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let ActivityLogsPayload = {
    userId: data.body.userId
  };
  let CreateActivityLogsPayload = {
    userId: data.body.userId,
    actionType: data.body.actionType,
    notesHistory: data.body.notesHistory || [],
  };
  
  activityLogs.findOne(ActivityLogsPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    activityLogs.create(CreateActivityLogsPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });
};
exports.createActivityLogs = createActivityLogs;

// Get
const getActivityLog = function (data, cb) {
  let findData = { };
  activityLogs.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched activityLogs details", resp, false))
  });
};
exports.getActivityLog = getActivityLog;

// Update
const editActivityLogs = function (data, cb) {
  if (!data.body.activityLogsId) {
    return cb(resStr(400, "Please add required details", null, true));
  }
  
  let query = { _id : data.body.activityLogsId };
  
  let updateActivityLogs = {
    name: data.body.name,
    locationDetails: data.body.locationDetails,
    isActive: data.body.isActive,
    notesHistory: data.body.notesHistory
  };

  let options = { new: true };

  activityLogs.findOneAndUpdate(query, updateActivityLogs, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true));
    }
    return cb(null, resStr(200, "updated data succesfully", resp, false));
  });
};
exports.editActivityLogs = editActivityLogs;

// Delete
const deleteActivityLogs = function (data, cb) {
  if (!data.body.activityLogsId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let query = { _id : data.body.activityLogsId };
  let updateActivityLogs = {
    isActive: false,
  };
  let options = { new: true };

  activityLogs.findOneAndUpdate(query, updateActivityLogs, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deleteActivityLogs = deleteActivityLogs;
