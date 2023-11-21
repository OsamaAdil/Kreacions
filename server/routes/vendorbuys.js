const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createVendorsBuy,
  getVendorsBuy,
  editVendorsBuy,
  deleteVendorsBuy
} = require('../controllers/vendorsBuy');

router.post('/', createVendorsBuy);
router.get('/', getVendorsBuy);
router.patch('/', editVendorsBuy);
router.delete('/', deleteVendorsBuy);

module.exports = router;
