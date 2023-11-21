const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createMetal,
  getMetal,
  editMetal,
  deleteMetal
} = require('../controllers/metals');

router.post('/', createMetal);
router.get('/', getMetal);
router.patch('/', editMetal);
router.delete('/', deleteMetal);

module.exports = router;
