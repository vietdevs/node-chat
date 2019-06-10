let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static('public'));

let messages = [];
let current_message_id = 0;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('your_ip', socket.handshake.address);

    socket.on('message', (message) => {
        let address = socket.handshake.address;

        console.log('message: ' + message + ' from ' + address);
        socket.broadcast.emit('message', message);
        messages.push({'ip': address, 'id': current_message_id, 'message': message});
        current_message_id += 1;
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/messages', (req, res) => {
    res.send(messages);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
