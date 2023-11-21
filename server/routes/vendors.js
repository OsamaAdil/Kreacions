const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createVendor,
  getVendor,
  editVendor,
  deleteVendor
} = require('../controllers/vendor');

router.post('/', createVendor);
router.get('/', getVendor);
router.patch('/', editVendor);
router.delete('/', deleteVendor);

module.exports = router;