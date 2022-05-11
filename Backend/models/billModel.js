const mongoose = require('mongoose');

const billModel = mongoose.Schema(

    {

     subtotal:{type:Number,required:true},
     discounttotal:{type:Number},
     nettotal:{type:Number,required:true},
     items:{type:Array},
     billdate:{type:String},
     
    },

    {timestamps: true}
)

const billMod = mongoose.model('bill',billModel);

module.exports = billMod;