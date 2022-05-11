const asyncHandler =  require("express-async-handler");
const foodModel = require('../models/fooditemModel');

const addfood = asyncHandler (async (req,res) => {


    const {name,category,price,discountper,discountammount,newprice,image,desc} = req.body;


    if(!name || !category || !price){

        res.status(404);
        throw new Error('Invalid Data');

    }

    const isfoodavailable = await foodModel.find({name:name});

     console.log(isfoodavailable)

    if(isfoodavailable.length !== 0){

        res.status(400);

        throw new Error('Food item already exist');

       

    }else{

        const foodItem    = await foodModel.create({name:name,category:category,price:price,discountpersantage:discountper,discountammount:discountammount,newprice:newprice,desc:desc,image:image});

        const newFoodItem = await foodModel.find({_id:foodItem._id});

        res.status(200);
        
        res.json(newFoodItem);

    }

});

const updateDiscount = asyncHandler(async(req,res) => {

    const {discountpersantage,discountammount,newprice} = req.body;

    const foodItem = await foodModel.findByIdAndUpdate(req.params.id,{discountpersantage:discountpersantage,discountammount:discountammount,newprice:newprice});

    const updatedItem = await foodModel.findOne({id:req.params.id});

    if(!updatedItem){

        res.status(400);
        throw new Error('Np specific fod item')
   
    }else{

    res.status(200);
    res.send(updatedItem);


    }

}); 

const getAllFoods =  asyncHandler(async(req,res) => {


    const {category,serach}= req.body;


    if((category == "") && (serach == "")){

        const foods = await foodModel.find({});

        if(foods.length == 0){

        res.status(400);
        res.json({message :'No food items available'});
        
    }else{


        res.status(200);
        res.send(foods)

    }

  }

    if((category !== "") && (serach == "")){

        const foods = await foodModel.find({"category":{$regex : new RegExp(category,"i")}});

        console.log(foods)

        if(foods.length == 0){

        res.status(400);
        res.json({message :'No food items available'});
        
    }else{


        res.status(200);
        res.send(foods);

    }

  }


    if((category == "") && (serach !== "")){

        //const foods = await foodModel.find({name : { $regex: '.*'+ serach +'.*',$options: 'i' }})
        const foods = await foodModel.find({name:{$regex: serach,$options: 'i'}})
        if(foods.length == 0){

        res.status(400);
        res.json({message :'No food items available'});
        
    }else{


        res.status(200);
        res.send(foods)

    }

  }

    if((category !== "") && (serach !== "")){

        const foods = await foodModel.find({name:{$regex: serach,$options: 'i'},category:{$regex:category,$options:'i'}});

        if(foods.length == 0){

        res.status(400);
        res.json({message :'No food items available'});
        
    }else{


        res.status(200);
        res.send(foods)

    }

  }

});


const getFood = asyncHandler(async(req,res) => {

    const {id} = req.body;


    if(!id){

        res.status(404);
        throw new Error('No Id Found');

    }else{

        const foodItem = await foodModel.findById(id);

        if(foodItem){

            res.status(200);

            res.json(foodItem)



        }else{

            res.status(400);

            throw new Error('No food item available');


        }



    }




})

module.exports = {addfood,updateDiscount,getAllFoods,getFood}