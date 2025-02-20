const express = require('express');
const { registorUser, authUser, allUser } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(registorUser).get(protect, allUser)
router.post('/login', authUser)

module.exports = router;