const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createTransaction,
  getTransaction,
  editTransaction,
  deleteTransaction
} = require('../controllers/transaction');

router.post('/', createTransaction);
router.get('/', getTransaction);
router.patch('/', editTransaction);
router.delete('/', deleteTransaction);

module.exports = router;
