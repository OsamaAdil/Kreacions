const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createJobOrderTransaction,
  getJobOrderTransaction,
  editJobOrderTransaction,
  deleteJobOrderTransaction
} = require('../controllers/jobOrderTransaction');

router.post('/', createJobOrderTransaction);
router.get('/', getJobOrderTransaction);
router.patch('/', editJobOrderTransaction);
router.delete('/', deleteJobOrderTransaction);

module.exports = router;
