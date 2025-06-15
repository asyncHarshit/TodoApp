import jwt from 'jsonwebtoken';
import user from '../model/User.js'

const userAuthentication = async (req , res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.json({
            message : "User not authenticated",
            success : false
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const userInfo = await user.findById(decoded.getId);

        if(userInfo){
            res.status(201).json({
                success : true,
                userInfo
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message : "Error in auth middleware"
        })
        console.log(error);}
}

export {userAuthentication}