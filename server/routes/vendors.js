const express = require('express');
const router = express.Router();
const formatRequest = require('../middlewares/formatRequest');
// const authenticator = require('../middlewares/authenticator');

const {
  createVendor,
  getVendor,
  editVendor,
  deleteVendor
} = require('../controllers/vendors');

router.post('/', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  createVendor(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

router.get('/', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  getVendor(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

router.patch('/', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  console.log("data", data);

  editVendor(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

router.delete('/', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  console.log("data", data);

  deleteVendor(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

module.exports = router;