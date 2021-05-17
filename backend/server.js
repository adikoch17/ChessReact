const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const server = app.listen(3001,()=>{
    console.log('connected to server');
});

var room;

const io = socket(server,{
    cors: {
      origin: true,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

io.on('connection',socket=>{
    socket.on('room', room=>{
      socket.join(room);
      socket.to(room).emit('message','room joined by' + socket.id);
    })
    socket.on('reset',room =>{
      io.to(room).emit('reset-from-server','reset')
    })
    socket.on('message',data=>{
      console.log(data);
      io.to(data.room).emit('message-from-server',data.message);
    })
    socket.on('move',(data)=>{
      var move = data[0];
      var room = data[1].room;
      console.log(move);
      console.log(room);
      io.to(room).emit('move-from-server',move);
    })
    
})