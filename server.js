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

const allFirebaseUsers =[];

io.on("connection", (socket) => {

   console.log(`A client has connected... ${socket.id}`);
   // socket.on("join_room", (room) => {
   //    socket.join(room);
   //    console.log(`user ${socket.id} has joined ${room}`);
   // });

      socket.on("firebaseUser", (data) => {
         socket.join(data.room);
         console.log(data);
         allFirebaseUsers.push(data)
         io.to(data.room).emit("allUsers", allFirebaseUsers);
   });
});



server.listen(3001, ()=> {console.log('Server is live')});