const express = require('express');
const router = express.Router();
const formatRequest = require('../middlewares/formatRequest');

const {
  createCompany,
  getCompany,
  editCompany,
  deleteCompany
} = require('../controllers/companies');

router.post('/', formatRequest, function (req, res, next) {
  const data = req.query;
  data.req = req.data;
  data.body = req.body;
  createCompany(data, function(err, response) {
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
  console.log("data", data);

  getCompany(data, function(err, response) {
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

  editCompany(data, function(err, response) {
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

  deleteCompany(data, function(err, response) {
      if (err) {
          console.log("entered into error", err);
          return res.status(err.status).send(err);
      }
      console.log("response", response);
      return res.status(response.status).send(response);
  });
});

module.exports = router;
