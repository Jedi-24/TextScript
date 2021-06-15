// you access front end socket.io lib. using io() method.
//everytime you reload chat page, new WS connection is triggered.
const socket=io(); // this is resposible for making websocket connection successful


//Get username and Room from URL(neww for me i didn't know bout this)..
//related to the Qs library (js version) we put in chat.html.
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

socket.emit('joinroom',{username,room})
const form = document.getElementById('chat-form')
const chatbox=document.querySelector('.chat-messages');
const roomName=document.querySelector('#room-name')
const userz=document.querySelector('#users')

socket.on('roommembz',({room,users})=>{
    outputRoom(room);
    outpurUsers(users);
})
//socket.on() method is responsible for catching the data sent by
//socket.emit() in server side JS.
socket.on('msg', text=>{
    outputText(text);
    //automatic scroll-down when new texts appear
    chatbox.scrollTop=chatbox.scrollHeight;
})
//text submit event
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // to extract the message a user writes.
    const text=e.target.elements.msg.value;
    //console.log(text);
    /*if you implement the outputText from here only, it will just
    be displayed on the screen through which it was sent, not on all the users in the room*/
    //outputText(text);
    //emmiting the text to server.
    socket.emit('chat-text',text)
    //clearing input after sending text
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

//output message to DOM
function outputText(sext){
    const div= document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${sext.user}<span>${' '}</span><span>${getLocalTime()}</span></p>
    <p class="text">
       ${sext.txt}
    </p>`
    document.querySelector('.chat-messages').append(div);
}
 

function getLocalTime() {
    let offset = new Date().getTimezoneOffset();
    let formatted = (offset / 60);

    let date = new Date();
    let systemTime = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);

    let clientTime = new Date(systemTime + (36 * 100 * 1000 * formatted));

    let hour = clientTime.getHours();
    if (hour > 12) {
        hour -= 12
    }
    let min = clientTime.getMinutes();
    let amPm = clientTime.toLocaleTimeString().split(' ')[1];
    return `${hour}:${min} ${amPm}`;
}



//add room name to DOM..
 function outputRoom(room){
 roomName.innerText=room
 }
//add users to DOM  //shi se smjh nahi aya.
 function outpurUsers(users){
 userz.innerHTML=`
 ${users.map(user=>`<li>${user.username}</li>`).join('')}
 `
 }