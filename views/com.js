// const { connection } = require('mongoose');

const io= require('socket.io')(8000)
const user ={};

io.on('connection',socket =>{
    socket.on('new-user', name=>{
        users[socket.id] =name;

    })
    socket.on('send', message=>{
        socket.brodcast.emit('recive',{meassage:message,name:users[socket.id]})
    })
})