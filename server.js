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
server.listen(3001, ()=> {console.log('Server is Live 👽')});





let allFirebaseUsers =[];
let cursorPositions = [];

io.on("connection", (socket) => {

   // ..............
   console.log(`A client has connected... ${socket.id}`);
   
   socket.on("firebaseUser", (data) => {
      socket.join(data.room);
      allFirebaseUsers.push(data);
      io.to(data.room).emit("allUsers", allFirebaseUsers);
      console.log(allFirebaseUsers);
      let newElement = {socketId : socket.id, room : data.room, x : 0, y : 0};
      cursorPositions.push(newElement);
      let roomCursors = cursorPositions
         .filter(obj => obj.room === data.room)
         .map( obj => ({socketId: obj.socketId, x: obj.x, y: obj.y}));
      io.to(data.room).emit("cursorUpdate", roomCursors);
   });

   // Listening to mouse movement and updating cursor positions
   socket.on("mouseMove", (data) => {
      cursorPositions.forEach(function(obj){
            if(obj.socketId === socket.id){
               obj.x = data.x;
               obj.y = data.y;
            }
      });
      // Emitting cursors back to the room
      let room = Array.from(socket.rooms)[1];
      let roomCursors = cursorPositions
         .filter(obj => obj.room === room)
         .map( obj => ({socketId: obj.socketId, x: obj.x, y: obj.y}));
      io.to(room).emit("cursorUpdate", roomCursors);
      // console.log(roomCursors);
   });

   // Diconnecting from the Room
   socket.on("disconnecting", () => {
      console.log(`user ${socket.id} disconnected`);
      let room = Array.from(socket.rooms)[1];
      socket.leave(room);
      allFirebaseUsers = allFirebaseUsers.filter((user) => user.socketId !== socket.id);
      io.to(room).emit("allUsers", allFirebaseUsers);
      cursorPositions.forEach(function(obj,index) {
         if (obj.socketId === socket.id) {
             cursorPositions.splice(index,1);
         }
      });
     let roomCursors = cursorPositions
        .filter(obj => obj.room === room)
        .map( obj => ({socketId: obj.socketId, x: obj.x, y: obj.y}));
      io.to(room).emit("cursorUpdate", roomCursors);

   });
});

