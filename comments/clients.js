
const socket =io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer =document.querySelector(".container")

const append =(message) =>{
    const messageElement =document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message')
    messageContainer.append(messageElement);

}
form.addEventListener('sumbit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`${message}`)
    socket.emit('send',message);
    messageinput.value= ''

})

const name =prompt("enter your name to get access ");
socket.emit('recent-comment',name)

socket.on('recent-comment'),name=>{
    append(`${name} recentely added comment`)
} 

Socket.on('receive',Data =>{
   append(`${data.message}:${data.users}`)
});