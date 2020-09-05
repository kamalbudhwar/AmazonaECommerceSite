import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import bodyParser from 'body-parser';
dotenv.config();
const mongodbUrl=config.MONGODB_URL;
const app=express();
app.use(bodyParser.json());
app.use('/api/users',userRoute);
mongoose.connect(mongodbUrl,{useNewUrlParser:true,useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify: false},console.log(`DB running on ${mongodbUrl}`)).catch((error)=>console.log(error.reason));
app.get("/api/products/product/:id",(req,res)=>{
    const productId=req.params.id;
    const product=data.products.find((x) => {return x._id==productId});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({msg: "Product Not Found"});
    }
})

app.get("/api/products",(req,res)=>{
    res.send(data.products)
})

app.listen(5000,()=>{
    console.log("Server started at http://localhost:5000");
})