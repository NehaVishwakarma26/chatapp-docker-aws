const Message=require("../models/Message")
const handleSocketConnection=(io)=>{

//whenever a user connects
io.on("connection",(socket)=>{
  console.log("user connected",socket.id)

//handle joining room
socket.on("join-room",(roomId)=>{
  socket.join(roomId)
  console.log("user joined room", roomId);

})

//handle sending and saving message
socket.on("send-message",async (data)=>{
  try{
    const {senderId,receiverId,message,roomId}=data

if(!senderId || !receiverId || !message || !roomId){
return console.error("missing data")
}


const newMessage=new Message({
  sender:senderId,
  receiver:receiverId,
  message:message,
  roomId:roomId
})

await newMessage.save()
//emit to all users in the room
io.to(roomId).emit("receive-message",{
  _id:newMessage._id,
  sender:senderId,
  receiver:receiverId,
  roomId,
  message,
  time:newMessage.timestamp
})
  }
  catch(Err)
  {
    console.error(Err)
  }
})
//disconnect handler
socket.on("disconnect",()=>{
  console.log("user disconnected",socket.id);
})


})



}

module.exports=handleSocketConnection