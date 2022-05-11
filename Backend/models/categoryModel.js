const mongoose = require('mongoose');

const categoryModel = mongoose.Schema(

    {
        categoryname:{type:String,required:true}
    },

    {timestamps: true}
)

const cataModel = mongoose.model('categories',categoryModel);

module.exports = cataModel;