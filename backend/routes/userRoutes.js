const express = require('express');
const { registorUser, authUser } = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(registorUser)
router.post('/login', authUser)

module.exports = router;