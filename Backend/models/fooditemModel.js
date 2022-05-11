const mongoose = require('mongoose');

const fooditemModel = mongoose.Schema(

    {

        name:{type:String,require:true},
        category:{type:String},
        price:{type:Number,require:true},
        discountpersantage:{type:Number},
        discountammount:{type:Number},
        newprice:{type:Number},
        desc:{type:String,require:true},
        image:{type:String}
 
    },

    {timestamps: true}
)

const foodModel = mongoose.model('foods',fooditemModel);

module.exports = foodModel;