const express = require('express');
const router = express.Router();
const formatRequest = require('../middlewares/formatRequest');
// const authenticator = require('../middlewares/authenticator');

const {
    register, 
    changePassword, 
    login,
    token
} = require('../controllers/auth');

router.post('/register', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  register(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

router.post('/changepassword', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  console.log("data", data);

  changePassword(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });

});

router.post('/login', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  console.log("data", data);

  login(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

router.post('/token', formatRequest, function (req, res, next) {
    const data = req.query;
    data.req = req.data;
    data.body = req.body;
    console.log("data", data);
  
    token(data, function(err, response) {
        if (err) {
            console.log("entered into error", err);
            return res.status(err.status).send(err);
        }
        console.log("response", response);
        return res.status(response.status).send(response);
    });
  });


module.exports = router;
