const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(5000);

io.on('connection', function (socket) {
    console.log('User connected');

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    socket.on('save-message', function (message) {
        console.log(message);
        io.emit('new-message', { message: message});
    });


    socket.on('save-user', function (userEmail) {
        console.log(userEmail);
    });


});