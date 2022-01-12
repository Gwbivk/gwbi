

const socket=io('http://localhost:8000')

const form =document.getElementById('send-container')
const messageinput =document.getElementById('messageinp')
const messagecontainer =document.querySelector(".container")
const append =(message)=>{
    const messageElement =document.createElement('div');
    messageElement.innertext=('message')
    messagecontainer.append(messageElement)
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messageinput.value;
    append(`you:${message}`)
    socket.emit('send',message);
    messageinput.value = ''
})

const name =prompt("enter your name to comments and to see comments")
// socket.emit('new-user', name);

// socket.on('user-joined')
socket.on('send',data=>{
    append(`${data.message}:${data.name}`)
})
