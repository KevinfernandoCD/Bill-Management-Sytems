const asyncHandler =  require("express-async-handler");
const generateToken = require('../config/generateToken');

const userMod = require('../models/userModel');


const registerUser = asyncHandler(async(req,res) => {

    const {firstname,lastname,age,username,password,isAdmin,image,nic}  = req.body;

    if(!firstname || !lastname || !password || !image || !age|| !nic) {

        res.status(400);
        throw new Error("Invalid Form Data");

    }

    const alreadyRegistered  =  await userMod.findOne({$or: [{username:username},{nic:nic}]});

    if(alreadyRegistered){

       return  res.status(400).send({message:"Username already in use"});
    

    }
    
    const newUser = await userMod.create({firstname,lastname,age,username,isAdmin,image,password,nic});
    

    if(newUser){

        res.status(200).json({id:newUser.id,firstname:newUser.firstname,lastname:newUser.lastname,age:newUser.age,image:newUser.image,isAdmin:newUser.isAdmin,username:newUser,username,nic:newUser.nic,token:generateToken(newUser.id)});

    }else {

        res.status(400);
        throw new Error('Failed to create user');
    }

});

const loginUser = asyncHandler(async(req,res,next) => {

    const {username,password} = req.body;

    if(!username || !password){


        res.status(404);
        
        throw new Error("Inavalid username or password")
    }

    let user = await userMod.findOne({username:username});

    if(user && await (user.matchPassword(password))) {

        res.status(200);
        res.json(user);

    }else{


        res.status(400);
        throw new Error('Invalid username or password')
    }

})

module.exports = {registerUser,loginUser}