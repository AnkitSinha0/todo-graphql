import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
}).then(con =>{
    // console.log(con.connections); 
    console.log('DB connection successful!');
}).catch(err => {
  console.error('DB connection error:', err);
});
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
