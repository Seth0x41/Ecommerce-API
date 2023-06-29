const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection= require('./config/database');
const categoryRoute=require('./routes/categoryRoute')
const ApiError = require('./utils/apiError')
const globalError = require('./middlewares/errorMiddleware')
dotenv.config({path:'config.env'});

//connect database
dbConnection()
// Node Application
const app = express();

// MiddleWare
if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"));
    console.log(`Mode ${process.env.NODE_ENV}`)}

app.use(express.json());


//Mount Routes
app.use('/api/v1/categories',categoryRoute)
app.all('*',(req,res,next)=>{
    next(new ApiError(`Can't Find this Route`,400));
})
// Global Error Handling Middleware
app.use(globalError)
const PORT = process.env.PORT;
app.listen(PORT,()=>{console.log(`App running on Port ${PORT}`)});