const jwt = require("jsonwebtoken");

const User=require("../models/User")

const authMiddleware=async (req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token) return res.status(401).json({error:"Unauthorized"})
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded)
            return res.status(401).json({error:"Unauthorized"})

        const user=await User.findById(decoded.id).select("-password")
        if(!user)
            return res.status(401).json({message:"Invalid Token"})

        req.user=user
        next()
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports=authMiddleware