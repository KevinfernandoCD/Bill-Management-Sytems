const express = require('express');
const {createBill,getBills} = require('../controller/billcontroller');
const {authUserTokenId} = require('../config/auth');

const router = express.Router();

router.route('/newbill').post(authUserTokenId,createBill);

router.route('/allbills').get(authUserTokenId,getBills);

module.exports = router