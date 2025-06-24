const User = require("../models/User");
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")
const register=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userExist=await User.findOne({email})
        if(userExist)
        {
            return res.status(400).json({message:"user already exists"})

        }

const hashedPassword=await bcrypt.hash(password,10);
const user=new User({email,password:hashedPassword})
await user.save()

res.status(201).json({message:"user created successfully"})

    }
    catch(err)
    {
        console.log(err)
            res.status(500).json({ message: "internal server error" });
    
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({message:"user does not exist"})
        }

const isMatch=await bcrypt.compare(password,user.password)

if(!isMatch)
{
    return res.status(401).json({message:"invalid credentials"})
}
console.log("Logging in user:", user); // Add this

const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
console.log("Issued token for", user.email, ":", token);

res.cookie("token", token, {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
  sameSite: "Strict", 
  secure: false       // 🔒 Set to true in production with HTTPS
});

res.status(200).json({messsage:"login successful"})


    }
    catch(err)
    {
        console.log(err)
            res.status(500).json({ message: "internal server error" });
    
    
    }
}

const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password")
        res.status(200).json({user})

    }
    catch(err)
    {
        console.log(err)
            res.status(500).json({ message: "internal server error" });
    
    
    
    }
}

 const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // Or 'None' if using cross-site cookies
    secure: false,   // Set to true in production with HTTPS
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

const getAllusers=async(req,res)=>{
    try{
        const users=await User.find().select("-password")
        res.status(200).json({users})
    }
    catch(Err)
    {
        console.log(Err)
    }
}

module.exports={register,login,getProfile,logout,getAllusers}