const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createCompany,
  getCompany,
  editCompany,
  deleteCompany
} = require('../controllers/company');

router.post('/', createCompany);
router.get('/', getCompany);
router.patch('/', editCompany);
router.delete('/', deleteCompany);

module.exports = router;
