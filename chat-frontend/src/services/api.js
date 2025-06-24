// services/api.js
import axios from "axios";

// 🔐 Create a base Axios instance with credentials enabled
const api = axios.create({
  baseURL: "http://ec2-15-206-164-179.ap-south-1.compute.amazonaws.com:5000/api",
  withCredentials: true,
});

export const login=(data)=>api.post("/user/login",data)
export const register = (data) => api.post("/user/register", data);


export const getProfile = () => api.get("/user/me");

export const logout=()=>api.post("/user/logout")

export const getMessages=(roomId)=>api.get(`/messages/${roomId}`)

export const sendMessage=(data)=>api.post("/messages/send",data)
export const allUsers=()=>api.get("/user/allusers")
export default api;
