const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema(

    {
        firstname:{type:String, required:true},
        lastname:{type:String, required:true},
        password:{type:String,required:true},
        image:{type:String, required:true, default:"https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"},
        isAdmin:{type:Boolean,default:false},
        username:{type:String, required:true},
        age:{type:Number, required:true},
        nic:{type:String, required:true}
    },

    {timestamps: true}

);

userModel.methods.matchPassword = async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password)
     
}

userModel.pre("save",async function (next) {

if(!this.isModified){
    next();
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt)

});

const userMod = mongoose.model("User",userModel);

module.exports = userMod;

