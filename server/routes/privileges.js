const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createPrivileges,
  getPrivileges,
  editPrivileges,
  deletePrivileges
} = require('../controllers/privileges');

router.post('/', createPrivileges);
router.get('/', getPrivileges);
router.patch('/', editPrivileges);
router.delete('/', deletePrivileges);

module.exports = router;
