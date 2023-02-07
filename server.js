const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
   }
});

server.listen(3001, ()=> {console.log('Server is Live')});

let allFirebaseUsers =[];

io.on("connection", (socket) => {

   // Listening to a Auth User Data upon Socket Connection
   // Joining a Room 
   // Broadcasting all Auth Users' Data back to the same room
   console.log(`A client has connected... ${socket.id}`);
   socket.on("firebaseUser", (data) => {
      socket.join(data.room);
      console.log(data);
      allFirebaseUsers.push(data)
      io.to(data.room).emit("allUsers", allFirebaseUsers);
   });

   // Diconnecting from the Room
   socket.on("disconnecting", () => {
      // console.log(`user ${socket.id} disconnected`);
      let room = Array.from(socket.rooms)[1];
      // console.log(`user ${socket.id} left ${room}`);
      socket.leave(room);
      allFirebaseUsers = allFirebaseUsers.filter((user) => user.socketId !== socket.id);
      io.to(room).emit("allUsers", allFirebaseUsers);
   });
})


// io.on('connection', (socket) => {
//    console.log('Client connected');
 
//    socket.on('firebaseUser', (data) => {
//      console.log(data);
//    });
 
//    socket.on('disconnecting', () => {
//      console.log('Client disconnected');
//    });
//  });
