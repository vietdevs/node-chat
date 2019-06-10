let messages = document.getElementsByClassName('message-list')[0];
let message_input = document.getElementById('message-input');
let message_form = document.getElementById('message-form');

let socket = io();

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

    if (message_input.value === '')
        return false;
    socket.emit('message', message_input.value);
    new_message.innerHTML = message_input.value;
    new_message.className = 'message me';
    messages.append(new_message);
    message_input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

socket.on('message', (message) => {
    let new_message = document.createElement('li');
    
    new_message.innerHTML = message;
    new_message.className = 'message';
    messages.append(new_message);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('your_ip', (ip) => {
    fetch('./messages')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        for (let i = 0; i < myJson.length; i += 1) {
            let current_message = document.createElement('li');

            current_message.innerHTML = myJson[i].message;
            if (ip === myJson[i].ip)
                current_message.className = "message me";
            else
                current_message.className = "message";
            messages.append(current_message);
        }
        messages.scrollTop = messages.scrollHeight;
    });
});
