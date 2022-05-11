const express = require('express');
const { registerUser,loginUser } = require('../controller/usersController');

//EXPRESS ROUTER IS AN FUNCTION THAT RETURNS AN OBJECT THAT CAN STORE MULTIPLE MIDDLEWARES AND ROUTES FOR THOES middlewares

const router = express.Router();

router.route('/newuser').post(registerUser);

router.route('/login').post(loginUser);

module.exports = router;

