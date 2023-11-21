const express = require('express');
const router = express.Router();
// const authenticator = require('../middlewares/authenticator');

const {
  createActivityLogs,
  getActivityLogs,
  editActivityLogs,
  deleteActivityLogs
} = require('../controllers/activityLogs');

router.post('/', createActivityLogs);
router.get('/', getActivityLogs);
router.patch('/', editActivityLogs);
router.delete('/', deleteActivityLogs);

module.exports = router;
