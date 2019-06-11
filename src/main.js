let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const bcrypt = require('bcrypt');

app.use(express.static('public'));

let messages = [];
let current_message_id = 0;
const salt = bcrypt.genSaltSync(5);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('your_ip', bcrypt.hashSync(socket.handshake.address, salt));

    socket.on('message', (message) => {
        let address = bcrypt.hashSync(socket.handshake.address, salt);

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
