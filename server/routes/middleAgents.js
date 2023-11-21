const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createMiddleAgent,
  getMiddleAgent,
  editMiddleAgent,
  deleteMiddleAgent
} = require('../controllers/middleAgent');

router.post('/', createMiddleAgent);
router.get('/', getMiddleAgent);
router.patch('/', editMiddleAgent);
router.delete('/', deleteMiddleAgent);

module.exports = router;
