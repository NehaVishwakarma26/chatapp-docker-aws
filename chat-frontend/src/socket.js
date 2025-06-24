import { io } from "socket.io-client";

const socket = io("http://ec2-15-206-164-179.ap-south-1.compute.amazonaws.com:5000", {
  transports: ['websocket'],
});

export default socket;
