import User from "../model/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

//  register a user

const registerUser = async(req,res)=>{
    try {
        const {name , email , password} = req.body;

        // check existing user
        const checkExistingUser = await User.findOne({email});
        if(checkExistingUser){
            res.status(401).json({
                message : "user already exist",
                success : false
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            name,
            email,
            password : hashedPassword,
        })

        await newUser.save();

        if(newUser){
            res.status(201).json({
                message : "User Created successfully !! "
            })
        
        }else{
            res.status(400).json({
                message : "Unable to register User",
                success : true
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message : "Error in register User in auth controller"
        })
        console.log(error);
        
        
    }

}


const loginUser = async(req,res)=>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                message : "User not found",
                success : false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password , user.password);

        if(!isPasswordMatch){
            res.status(401).json({
                message : "Wrong password !!",
                success : false
            })

        }

        // creating JWT token

        const accessToken  = jwt.sign({
            email : user.email,
            userId : user._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1000m"
        })

        res.json({
            message : "Logged in sucessfully",
            success : true,
            accessToken
        })




        
    } catch (error) {
        res.status(500).json({
            message : "Error in login User in user controller"
        })
        console.log(error);
        
    }

}




export {registerUser,loginUser};