import express from "express";
import connectDB from "./database/db.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.listen(3000,()=>{
    console.log("App is running on 3000");
    
})