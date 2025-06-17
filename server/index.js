import express from "express";
import connectDB from "./database/db.js"
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js'
import taskRouter from './routes/task.route.js'

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "https://todo-app-client-alpha-gray.vercel.app",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200
    })
);

// Handle preflight requests
app.options('*', cors({
    origin: "https://todo-app-client-alpha-gray.vercel.app",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/api/auth',userRouter);
app.use('/api/task',taskRouter);



// app.use('/api')

app.listen(3000,()=>{
    console.log("App is running on 3000");
    
})