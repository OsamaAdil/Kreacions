const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createClientsSupply,
  getClientsSupply,
  editClientsSupply,
  deleteClientsSupply
} = require('../controllers/clientsSupply');

router.post('/', createClientsSupply);
router.get('/', getClientsSupply);
router.patch('/', editClientsSupply);
router.delete('/', deleteClientsSupply);

module.exports = router;
