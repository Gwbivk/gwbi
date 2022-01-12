

const socket=io('http://localhost:8000')

const form =document.getElementById('send-comments')
const messageinput =document.getElementById('messageinp')
const messagecontainer =document.querySelector(".container")
const append =(message)=>{
    const messageElement =documents.createElement('div');
    messageElement.innertext=('message')
    messageElement.append(messageElement)
}

const name =prompt("enter your name to comments and to see comments")
socket.emit('new-user', name);

socket.on('user-joined')