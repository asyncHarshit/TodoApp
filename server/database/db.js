import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        if(res){
            console.log("Mongo connected Sucessfully");
            
        }
        
    } catch (error) {
        console.log("Failed to connect MONGO DB",error.message);
        
        
    }
} 

export default connectDb;
    
    
