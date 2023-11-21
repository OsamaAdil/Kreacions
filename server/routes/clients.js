const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createClient,
  getClient,
  editClient,
  deleteClient
} = require('../controllers/client');

router.post('/', createClient);
router.get('/', getClient);
router.patch('/', editClient);
router.delete('/', deleteClient);

module.exports = router;
