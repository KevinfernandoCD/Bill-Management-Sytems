const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        const conn = await mongoose.connect('mongodb+srv://admin:64H7GJ9ChyBhDa1x@cluster0.7gvu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        console.log(`Connected to the database`);
        
    } catch (error) {

        
        console.log(`error:${error}`);
        process.exit();
        
    }
}
 
module.exports = connectDB;