const io = require('socket.io')(8000)

const users ={};
io.on('connection',Socket =>{
    Socket.on('new-comment',name =>{
    console.log("recent-comments",name );
    users[Socket.id] = name;
    Socket.broadcast.emit('welcome',name);
    });

    Socket.on('send',message =>{
        Socket.broadcast.emit('recive',{message: message,name: users[Socket.id]})
    });
})