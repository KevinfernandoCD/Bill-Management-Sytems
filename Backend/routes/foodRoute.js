const express = require('express');
const {authUserTokenId} = require('../config/auth');
const {addfood,updateDiscount,getAllFoods,getFood} = require('../controller/foodController');

const router = express.Router();

router.route('/addnewfood').post(authUserTokenId,addfood);

router.route('/updatediscount/:id').put(authUserTokenId,updateDiscount);
router.route('/allfoods').post(authUserTokenId,getAllFoods);
router.route('/findfood').post(authUserTokenId,getFood);

module.exports = router;

