const express = require('express');
const router = express.Router();
const formatRequest = require('../middlewares/formatRequest');

const {
  createCurrency,
  getCurrency,
  editCurrency,
  deleteCurrency
} = require('../controllers/currencies');

router.post('/', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  createCurrency(data, function(err, response) {
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
  getCurrency(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

router.patch('/',formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  editCurrency(data, function(err, response) {
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
  deleteCurrency(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

module.exports = router;
