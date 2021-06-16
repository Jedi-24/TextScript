const path = require('path');
const http = require('http');
const express = require('express');
const socket= require('socket.io');
const formattext= require('./utils/formatText')
const { userJoin,getCurrentUser,userLeave,roomUsers}= require('./utils/users')
const app =express();
const server = http.createServer(app) // important.
const BOT='ROCI  ';
const io= socket(server)// don't include it before creating server duh.
app.use(express.static(path.join(__dirname,'Statics')))

//runs when client connects,io.on() is gonna
//listen for an event(here-->connection) and print the message on console.
io.on('connection', socket =>{
    socket.on('joinroom',({username,room})=>{
        const user=userJoin(socket.id,username,room)
        socket.join(user.room)
        //welcome current user.
    socket.emit('msg',formattext(BOT,'Welcome to TextScript')); //emiting data to client.(front-end JS)

    //broadcast when a user connects.
    socket.broadcast.to(user.room).emit('msg',formattext(BOT,`${user.username} has joined the chat`))
    
    // get user and room info to display 
    io.to(user.room).emit('roommembz',{room: user.room,
        users: roomUsers(user.room)})
    }) 
    //catch chat-text from client
    socket.on('chat-text',(txt)=>{
        const user=getCurrentUser(socket.id);

      //console.log(txt);
      io.to(user.room).emit('msg',formattext(user.username,txt))
    })
    //catch location info emitted by client.
    socket.on('location infoz',(coordinates)=>{
        const user=getCurrentUser(socket.id);

        io.to(user.room).emit('sendLocationText', locationGenerator(user.username,coordinates))
    })
    //runs when a user disconnects
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id);
        if(user){
        io.to(user.room).emit('msg',formattext(BOT,`${user.username}has left the chat`))
        }
        io.to(user.room).emit('roommembz',{room: user.room,
            users: roomUsers(user.room)})
    })
})
//process.env.PORT makes an environment variable named PORT in case 3000 PORT is not there.
const PORT= process.env.PORT; 

//using server.listen instead of app.listen(related to createServer method...)
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});