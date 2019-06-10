let messages = document.getElementsByClassName('message-list')[0];
let message_input = document.getElementById('message-input');
let message_form = document.getElementById('message-form');

let socket = io();

messages.scrollTop = messages.scrollHeight;

message_input.addEventListener('keydown', (event) => {
    if (event.keyCode == 13 /*enter*/ && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
    return false;
});

message_form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessage();
    return false;
});

function sendMessage()
{
    let new_message = document.createElement('li');

    socket.emit('message', message_input.value);
    new_message.innerHTML = message_input.value;
    new_message.className = 'message me';
    messages.append(new_message);
    message_input.value = '';
}

socket.on('message', (message) => {
    let new_message = document.createElement('li');
    
    new_message.innerHTML = message;
    new_message.className = 'message';
    messages.append(new_message);
});
