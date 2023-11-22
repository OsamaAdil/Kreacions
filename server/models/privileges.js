const mongoose = require("mongoose");
const { Schema } = mongoose;

let privilegesSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    privilegesModule: {  
        appdata: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        dashboard: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        users: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        buy: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        process: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        sales: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        orders: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        activitylogs: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
        },
        reports: {
          read: {
            type: Boolean,
            default: false,
          },
          write: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
      }, 
    },

    privilegesSubModule: {
      company: {
        read: {
          type: Boolean,
          default: false,
        },
        write: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      metal: {
        read: {
          type: Boolean,
          default: false,
        },
        write: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      middleAgent: {
        read: {
          type: Boolean,
          default: false,
        },
        write: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      vendor: {
        read: {
          type: Boolean,
          default: false,
        },
        write: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      client: {
        read: {
          type: Boolean,
          default: false,
        },
        write: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      jobWork: {
        read: {
          type: Boolean,
          default: false,
        },
        write: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },

    },
  },
  { timestamps: true }
);

let privileges = mongoose.model("privileges", privilegesSchema);
module.exports = privileges;


