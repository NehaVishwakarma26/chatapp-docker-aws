const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({

    message:{
        type:String,
        require:true,

    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    roomId:{
type:String,
required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
    

})

module.exports=mongoose.model("Message",MessageSchema)