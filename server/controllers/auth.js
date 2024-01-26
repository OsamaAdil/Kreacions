const Users = require("../models/users");
const multer = require("multer");
const uploadImage = multer();
const { resStr } = require("../helpers/responseStructure");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const register = async function (data, cb) {
  if (!data.body.email || !data.body.password) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let hashPassword = await bcrypt.hash(data.body.password, saltRounds);
  let findData = {
    email: data.body.email,
  };

  Users.findOne(findData, (err, resp) => {
    if (err) {
        console.log("inside error of finding user");
      return cb(resStr(500, "Error in finding", null, true));
    }
    if (resp) {
      return cb(null, resStr(400, "Already exists", resp, false));
    }

    // const tokenPayload = {
    //   email: data.body.email,
    // };
    // const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SEC, { expiresIn: "15s",});
    // const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SEC, { expiresIn: "1h",});

    let CreateUserPayload = {
      email: data.body.email,
      password: hashPassword
    };

    Users.create(CreateUserPayload, (errC, resC) => {
      if (errC) {
        return cb(resStr(500, "Error while creating", null, true));
      }
      return cb(null, resStr(200, "Registered succesfully", resC, false));
    });
  });
};
exports.register = register;

const login = async function (data, cb) {
  if (!data.body.email || !data.body.password) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let findData = {
    email: data.body.email,
  };

  Users.findOne(findData, async (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true));
    }

    if(resp) {
        console.log("resp,", resp);

        const passwordMatch = await bcrypt.compare(data.body.password, resp.password);
        if (!passwordMatch) {
          return cb(resStr(400, "Password does not match", null, true));
        }

        const tokenPayload = {email: resp.email};
        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SEC, { expiresIn: "10s" });
        const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SEC, { expiresIn: "1h" });
        
        Users.findOneAndUpdate({ email: resp.email }, { refreshToken: refreshToken }, (errUser, resUser) => {
          if (errUser) {
              return cb(resStr(500, "Error while Updating refresh token", null, true));
            }
        })

        let response = {
          user: resp,
          accessToken: accessToken
        };

        return cb(null, resStr(200, "Login succesfully", response, false)); 
    }

    else {
        return cb(null, resStr(400, "wrong password or email id", resp, false));
      }
  });
};

exports.login = login;


const token = async function (data, cb) {
  if (!data.body.refreshToken) {
    return cb(resStr(400, "Please add required details", null, true));
  }

  let findData = {
    email: data.body.email,
  };
  
  Users.findOne(findData, async (err, resp) => {
    if (err) {
      return cb(resStr(500, "Error in finding", null, true));
    }
    if(resp) {
      // Verify the refresh token
      jwt.verify(data.body.refreshToken, process.env.REFRESH_TOKEN_SEC, (err, user) => {
        if (err) {
          return cb(resStr(400, "Forbidden - Refresh token invalid", null, true));
          }
          // Generate a new access token
          const tokenPayload = {email: data.body.email};
          const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SEC, { expiresIn: "10s" });
          let response = {
            user: resp,
            accessToken: accessToken
          };
          return cb(null, resStr(200, "new token generated", response, false)); 
    });
    }
    else {
        return cb(null, resStr(400, "wrong details", resp, false));
      }
  });
};

exports.token = token;
