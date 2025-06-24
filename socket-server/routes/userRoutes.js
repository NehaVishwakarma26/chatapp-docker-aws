const express=require("express")
const {getAllusers,register,login,getProfile,logout}=require("../controller/userController")

const requireAuth= require("../middlewares/authMiddleware");

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/me",requireAuth,getProfile)
router.post("/logout",requireAuth,logout)
router.get("/allusers",requireAuth,getAllusers)
module.exports=router