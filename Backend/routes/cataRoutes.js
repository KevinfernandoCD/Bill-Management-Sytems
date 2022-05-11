const express = require('express');
const {addCategory,getCategories} = require('../controller/categoriesController');
const {authUserTokenId} = require('../config/auth');

const router = express.Router();

router.route('/newcategory').post(authUserTokenId,addCategory);
router.route('/allcategories').get(authUserTokenId,getCategories);

module.exports = router;