const Privileges = require("../models/privileges");
const multer = require('multer');
const uploadImage = multer();
const {resStr} = require("../helpers/responseStructure");

const rectifyName = function (a) {
  return a.toLowerCase();
};

//Create
const createPrivileges = function (data, cb) {
  if (!data.body.userId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let PrivilegesPayload = {
    userId: data.body.userId
  };

  let CreatePrivilegesPayload = {
    userId: data.body.userId,
    privilegesModule: {
      appdata: {
        read: data.body.privilegesModule.appdata.read || false,
        write: data.body.privilegesModule.appdata.write || false,
        delete: data.body.privilegesModule.appdata.delete || false,
      },
      dashboard: {
        read: data.body.privilegesModule.dashboard.read || false,
        write: data.body.privilegesModule.dashboard.write || false,
        delete: data.body.privilegesModule.dashboard.delete || false,
      },
      users: {
        read: data.body.privilegesModule.users.read || false,
        write: data.body.privilegesModule.users.write || false,
        delete: data.body.privilegesModule.users.delete || false,
      },
      buy: {
        read: data.body.privilegesModule.buy.read || false,
        write: data.body.privilegesModule.buy.write || false,
        delete: data.body.privilegesModule.buy.delete || false,
      },
      process: {
        read: data.body.privilegesModule.process.read || false,
        write: data.body.privilegesModule.process.write || false,
        delete: data.body.privilegesModule.process.delete || false,
      },
      sales: {
        read: data.body.privilegesModule.sales.read || false,
        write: data.body.privilegesModule.sales.write || false,
        delete: data.body.privilegesModule.sales.delete || false,
      },
      orders: {
        read: data.body.privilegesModule.orders.read || false,
        write: data.body.privilegesModule.orders.write || false,
        delete: data.body.privilegesModule.orders.delete || false,
      },
      activitylogs: {
        read: data.body.privilegesModule.activitylogs.read || false,
        write: data.body.privilegesModule.activitylogs.write || false,
        delete: data.body.privilegesModule.activitylogs.delete || false,
      },
      reports: {
        read: data.body.privilegesModule.reports.read || false,
        write: data.body.privilegesModule.reports.write || false,
        delete: data.body.privilegesModule.reports.delete || false,
      },
    },
    privilegesSubModule: {
      company: {
        read: data.body.privilegesSubModule.company.read || false,
        write: data.body.privilegesSubModule.company.write || false,
        delete: data.body.privilegesSubModule.company.delete || false,
      },
      metal: {
        read: data.body.privilegesSubModule.metal.read || false,
        write: data.body.privilegesSubModule.metal.write || false,
        delete: data.body.privilegesSubModule.metal.delete || false,
      },
      middleAgent: {
        read: data.body.privilegesSubModule.middleAgent.read || false,
        write: data.body.privilegesSubModule.middleAgent.write || false,
        delete: data.body.privilegesSubModule.middleAgent.delete || false,
      },
      vendor: {
        read: data.body.privilegesSubModule.vendor.read || false,
        write: data.body.privilegesSubModule.vendor.write || false,
        delete: data.body.privilegesSubModule.vendor.delete || false,
      },
      client: {
        read: data.body.privilegesSubModule.client.read || false,
        write: data.body.privilegesSubModule.client.write || false,
        delete: data.body.privilegesSubModule.client.delete || false,
      },
      jobWork: {
        read: data.body.privilegesSubModule.jobWork.read || false,
        write: data.body.privilegesSubModule.jobWork.write || false,
        delete: data.body.privilegesSubModule.jobWork.delete || false,
      },
    },
  };
  
  Privileges.findOne(PrivilegesPayload, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true))
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false))
    }
    Privileges.create(CreatePrivilegesPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true))
      }
      return cb(null, resStr(200, "Inserted succesfully", resC, false))
    });
  });

};
exports.createPrivileges = createPrivileges;

//Get
const getPrivilege = function (data, cb) {
  let findData = { };
  Privileges.find(findData, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "succesfully fetched Privileges details", resp, false))
  });
};
exports.getPrivilege = getPrivilege;

//Update
const editPrivileges = function (data, cb) {
  if (!data.body.privilegesId) {
    return cb(resStr(400, "Please add required details", null, true))
  }
  
  let query = { _id : data.body.privilegesId };

  let updatePrivileges = {
    userId: data.body.userId,
    privilegesModule: {
      appdata: {
        read: data.body.privilegesModule.appdata.read || false,
        write: data.body.privilegesModule.appdata.write || false,
        delete: data.body.privilegesModule.appdata.delete || false,
      },
      dashboard: {
        read: data.body.privilegesModule.dashboard.read || false,
        write: data.body.privilegesModule.dashboard.write || false,
        delete: data.body.privilegesModule.dashboard.delete || false,
      },
      users: {
        read: data.body.privilegesModule.users.read || false,
        write: data.body.privilegesModule.users.write || false,
        delete: data.body.privilegesModule.users.delete || false,
      },
      buy: {
        read: data.body.privilegesModule.buy.read || false,
        write: data.body.privilegesModule.buy.write || false,
        delete: data.body.privilegesModule.buy.delete || false,
      },
      process: {
        read: data.body.privilegesModule.process.read || false,
        write: data.body.privilegesModule.process.write || false,
        delete: data.body.privilegesModule.process.delete || false,
      },
      sales: {
        read: data.body.privilegesModule.sales.read || false,
        write: data.body.privilegesModule.sales.write || false,
        delete: data.body.privilegesModule.sales.delete || false,
      },
      orders: {
        read: data.body.privilegesModule.orders.read || false,
        write: data.body.privilegesModule.orders.write || false,
        delete: data.body.privilegesModule.orders.delete || false,
      },
      activitylogs: {
        read: data.body.privilegesModule.activitylogs.read || false,
        write: data.body.privilegesModule.activitylogs.write || false,
        delete: data.body.privilegesModule.activitylogs.delete || false,
      },
      reports: {
        read: data.body.privilegesModule.reports.read || false,
        write: data.body.privilegesModule.reports.write || false,
        delete: data.body.privilegesModule.reports.delete || false,
      },
    },
    privilegesSubModule: {
      company: {
        read: data.body.privilegesSubModule.company.read || false,
        write: data.body.privilegesSubModule.company.write || false,
        delete: data.body.privilegesSubModule.company.delete || false,
      },
      metal: {
        read: data.body.privilegesSubModule.metal.read || false,
        write: data.body.privilegesSubModule.metal.write || false,
        delete: data.body.privilegesSubModule.metal.delete || false,
      },
      middleAgent: {
        read: data.body.privilegesSubModule.middleAgent.read || false,
        write: data.body.privilegesSubModule.middleAgent.write || false,
        delete: data.body.privilegesSubModule.middleAgent.delete || false,
      },
      vendor: {
        read: data.body.privilegesSubModule.vendor.read || false,
        write: data.body.privilegesSubModule.vendor.write || false,
        delete: data.body.privilegesSubModule.vendor.delete || false,
      },
      client: {
        read: data.body.privilegesSubModule.client.read || false,
        write: data.body.privilegesSubModule.client.write || false,
        delete: data.body.privilegesSubModule.client.delete || false,
      },
      jobWork: {
        read: data.body.privilegesSubModule.jobWork.read || false,
        write: data.body.privilegesSubModule.jobWork.write || false,
        delete: data.body.privilegesSubModule.jobWork.delete || false,
      },
    },
    isActive: data.body.isActive,
  };

  let options = { new: true };

  Privileges.findOneAndUpdate(query, updatePrivileges, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true));
    }
    return cb(null, resStr(200, "updated data succesfully", resp, false));
   });
};
exports.editPrivileges = editPrivileges;

//Delete
const deletePrivileges = function (data, cb) {
  if (!data.body.privilegesId) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let query = { _id : data.body.privilegesId };
  let updatePrivileges = {
    isActive: false,
  };
  let options = { new: true };

  Privileges.findOneAndUpdate(query, updatePrivileges, options, (err, resp) => {
    if (err) {
      return cb(resStr(500, "Server error while fetching details from server", null, true))
    }
    return cb(null, resStr(200, "deleted succesfully", resp, false))
  });
};
exports.deletePrivileges = deletePrivileges;
