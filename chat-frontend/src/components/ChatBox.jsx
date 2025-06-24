import React,{useEffect,useState,useRef} from 'react'
import { getMessages,sendMessage as sendMessageAPI } from '../services/api'
import socket from "../socket"

const ChatBox = ({roomId,currentUserId,receiverId}) => {

const [message,setMessage]=useState("")
const [chatLog,setChatLog]=useState([])
const chatEndRef=useRef(null)

//makes tge chat window always scroll to the bottom
const scrollToBottom=()=>{
  chatEndRef.current?.scrollIntoView({behavior:"smooth"})
}

useEffect(()=>{
  if(!roomId) return

socket.connect()
socket.emit("join-room",roomId)

const fetchChat=async()=>{
  try{
    const res=await getMessages(roomId);
    const sortedMessages=res.data.messages.sort((a,b)=>new Date(a.timestamp)-new Date(b.timestamp))
    setChatLog(sortedMessages)

  }
  catch(Err)
  {
    console.error(Err)

  }

}
fetchChat()

return ()=>{
  socket.off("receive-message")
  socket.disconnect()
}

},[roomId])

//to receive msgs in real time
useEffect(()=>{
socket.on("receive-message",(data)=>{
  console.log("Received",data)
  setChatLog((prev)=>[...prev,data])
})

return ()=>{
  socket.off("receive-message")
}

},[])

const sendMessage=async()=>{
  if(!message.trim())
    return

  const msgData={
    senderId:currentUserId,
    receiverId,
    roomId,
    message,
    
    time: new Date().toISOString()
  }
console.log("Emitting message:", msgData);

socket.emit("send-message",msgData)


setMessage("")
}

useEffect(()=>{
  scrollToBottom();
},[chatLog])


return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-2">Chat Room</h2>

      <div className="h-64 overflow-y-auto bg-gray-800 p-2 mb-4 rounded">
        {chatLog.map((msg, idx) => {
         const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  const isMine = senderId === currentUserId;
          return (
            <div
              key={idx}
              className={`my-1 p-2 rounded max-w-xs break-words ${
                isMine
                  ? "bg-green-600 ml-auto text-right"
                  : "bg-gray-600 text-left"
              }`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-300 block mt-1">
                {msg.time
                  ? new Date(msg.time).toLocaleTimeString()
                  : new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded text-white"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox
