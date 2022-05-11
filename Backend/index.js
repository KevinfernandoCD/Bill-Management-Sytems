const express = require("express");
const cors = require("cors");
const connectDB = require('./config/connect_db');
const userRoutes  = require('./routes/userRoutes');
const cataRoutes = require('./routes/cataRoutes');
const foodRoutes = require('./routes/foodRoute');
const billRoutes = require('./routes/billRoutes');
const app = express();

app.use(express.json());

app.use(cors({origin:"http://localhost:3000"}));

connectDB();

//MIDDLEWARE FOR CREATING AND LOGGIN IN USERS
app.use('/api/users',userRoutes);
app.use('/api/categories',cataRoutes);
app.use('/api/foods',foodRoutes);
app.use('/api/billing',billRoutes);


app.get('/', (req, res) => {

    res.send("Api is running")
    
});

const server =  app.listen(5000, console.log('listening'));