const Message=require("../models/Message")

const sendMessage=async(req,res)=>{
    try{
        const {senderId,receiverId,message,roomId}=req.body
        const newMessage=new Message({
            sender:senderId,
            receiver:receiverId,
            message,
            roomId
        })
        await newMessage.save()
        console.log(newMessage);
        res.status(200).json(message)
    }catch(err){
        res.status(500).json(err)
    }
}

const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports={
    sendMessage,
    getMessages
}