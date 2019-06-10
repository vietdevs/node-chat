let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log('message: ' + message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
