#start with official node js env means app to run in a machine that already has node.js v18 installed
FROM node:18

#set a working dir inside the container 
#all the commands below will run inside a folder called /app inside the docker container
WORKDIR /app

# copy backend package.json n install backend dependencies
COPY socket-server/package*.json ./
RUN npm install

# copy the backend code
COPY socket-server .

#copy built frontend already done via npm run build
COPY chat-frontend/dist ./chat-frontend/dist

#expose the backend port
#let people connect to port 3001 where the app runs
EXPOSE 3001

#start your app inside the container
#run the app normally like we do node index.js
CMD ["node","index.js"]