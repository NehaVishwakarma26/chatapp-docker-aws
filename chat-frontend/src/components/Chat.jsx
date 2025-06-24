// import React from 'react'
// import { useEffect,useState } from 'react'
// import {io} from "socket.io-client"

// const socket=io("http://localhost:3000")
// const Chat = () => {

// const [message,setMessage]=useState("")
// const [chatLog,setChatLog]=useState([])

// useEffect(()=>{
//     socket.on("receive-message",(newMessage)=>{
//         setChatLog((prev)=>[...prev,newMessage])
//     })

// return()=>{
//     socket.off("receive-message")
//     socket.disconnect();
// }

// },[])

// const handleSendMessage = (e) => {
//   e.preventDefault(); // prevent form reload

//   if (!message.trim()) return; // avoid sending empty messages

//   socket.emit("send-message", message); //Send message to server
//   setMessage(""); // clear input
// };


//   return (
//     <div>
//       <form onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default Chat


