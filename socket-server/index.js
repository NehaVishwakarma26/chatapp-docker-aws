require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const handleSocketConnection = require("./socket/chatSocket");

const app = express();
const server = http.createServer(app);
const fs=require("fs")
const io = new Server(server, {
  cors: {
    origin: "http://ec2-15-206-164-179.ap-south-1.compute.amazonaws.com:5000", 
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

handleSocketConnection(io);

//
// ✅ Serve Frontend (React Build)
// Make sure this is placed **after** all API routes
//
const frontendPath = path.resolve(__dirname, "chat-frontend/dist");

  // Check if folder and index.html exist
  if (fs.existsSync(frontendPath) && fs.existsSync(path.join(frontendPath, "index.html"))) {
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  } else {
    console.warn("Frontend build not found. Skipping static serve.");
  }

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
