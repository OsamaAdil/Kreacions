const mongoose = require("mongoose");
const { Schema } = mongoose;

let activityLogsSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    },
    actionType: {
      type: String,
      enum: [
        "appdata",
        "dashboard",
        "users",
        "buy",
        "process",
        "sales",
        "orders",
        "activitylogs",
        "reports"
      ],
      required: true,
    },
    // changes: {
    //   type: Map,
    //   of: new Schema({
    //     previous: {
    //       type: String,
    //     },
    //     current: {
    //       type: String,
    //     },
    //   }),
    // },
    
    isActive: {
      type: Boolean,
      default: true,
    },

    notesHistory: [
      {
        _id: false,
        note: {
          type: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

let activityLogs = mongoose.model("activityLogs", activityLogsSchema);
module.exports = activityLogs;
