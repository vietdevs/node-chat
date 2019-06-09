let messages = document.getElementsByClassName('message-list')[0];
let message_input = document.getElementById('message-input');
let message_form = document.getElementById('message-form');

messages.scrollTop = messages.scrollHeight;

message_input.addEventListener('keydown', (event) => {
    if (!event.shiftKey) {
        event.preventDefault();
        console.log("Return pressed");
    }
});

message_form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Submitted");
});
