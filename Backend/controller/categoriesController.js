const asyncHandler =  require("express-async-handler");

const cataModel = require('../models/categoryModel');


const addCategory = asyncHandler(async(req,res) => {

    const {name} = req.body;

    if(!name){

        res.status(404);
        throw new Error('Invalid form data');
    }

    const isCategoryAvailable =  await cataModel.findOne({categoryname:name});

    console.log(isCategoryAvailable)


    if(isCategoryAvailable){

        res.status(400);
        throw new Error('Category already added');

    }else{


        const newCategory =  await cataModel.create({categoryname:name});


        res.status(200);
        res.json(newCategory);
    }


});

const getCategories = asyncHandler(async(req,res) => {

    const allCategories = await cataModel.find({});


    if(allCategories.length == 0){


        res.status(400);

        res.json({message:"No categories"});


    }else{

    res.status(200);

    res.send(allCategories);
    
    }



});


module.exports = {addCategory,getCategories}