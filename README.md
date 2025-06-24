## 📁 Step 1: Setup and GitHub Repo

- I created a public GitHub repository for my chat application.
- The project contains two parts:
  - `chat-frontend/` → Vite + React (port 5173)
  - `socket-server/` → Node.js + Socket.io (port 3001)


## ✅ Step 2: Prepare App for Docker Deployment
2.1 Build Frontend
To prepare the frontend (chat-frontend) for production, I created a build using:

cd chat-frontend
npm install
npm run build
This generated a static dist/ folder inside chat-frontend/.
We will serve this built frontend from the backend server using Express.

 2.2 Modify Backend to Serve Frontend
To simplify deployment, I updated the backend (socket-server/index.js) to serve the built frontend files directly. This way, the backend and frontend run as a single Docker container.


Bug Encountered: Express 5.x Crash
While testing the backend after these changes, I encountered the following error:

TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError
    at name ...
    at lexer ...
    ...
This was due to express@5.x, which is not fully stable yet.

Solution
I downgraded Express to a stable version (v4.18.2):

npm uninstall express
npm install express@4.18.2
After this fix, the backend served both APIs and frontend correctly via:

http://localhost:3001

2.3 Docker Build and Run
Build the Docker Image
Built the Docker image using the Dockerfile located inside the socket-server/ directory:


docker build -t chat-app -f socket-server/Dockerfile .
Run the Container on Port 5001
To run the container and expose it on the host:


docker run -p 5001:3001 chat-app
This maps port 5001 on the host machine to port 3001 inside the container.
The full app can now be accessed at:

http://localhost:5001