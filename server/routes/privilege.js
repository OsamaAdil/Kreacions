const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createPrivilege,
  getPrivilege,
  editPrivilege,
  deletePrivilege
} = require('../controllers/privilege');

router.post('/', createPrivilege);
router.get('/', getPrivilege);
router.patch('/', editPrivilege);
router.delete('/', deletePrivilege);

module.exports = router;
