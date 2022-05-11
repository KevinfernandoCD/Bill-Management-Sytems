const asyncHandler =  require("express-async-handler");

const billMod = require('../models/billModel');


const createBill = asyncHandler(async(req,res) => {

    const {subtotal,nettotal,discounttotal,billdate} = req.body;


    if(!subtotal || !nettotal || !billdate){


        res.status(404);
        throw new Error('No Data');


    }

    let ItemsArray  = JSON.parse(req.body.items)

    const bill  = await billMod.create({subtotal:subtotal,nettotal:nettotal,discounttotal:discounttotal,items:ItemsArray,billdate:billdate});        
    
    const billItem = await billMod.findOne({_id:bill._id});

    if(billItem){

        res.status(200);
        res.json(billItem);

    }else {


        res.status(400);
        throw new Error('Falied to bill data');

    }

});


const getBills = asyncHandler(async(req,res) => {

    const allbills = await billMod.find({});

    if(allbills.length == 0){

        res.status(400);

        res.json({message:"No Bills"});


    }else{

    res.status(200);

    res.send(allbills);
    
   }

})


module.exports = {createBill,getBills}
