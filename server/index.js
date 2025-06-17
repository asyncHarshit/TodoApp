import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

dotenv.config();

const app = express();

// ✅ Use CORS middleware before any routes
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

// ✅ Your routes
app.use("/api/auth", userRouter);
app.use("/api/task", taskRouter);



app.listen(3000, () => {
  console.log("App is running on port 3000");
});
