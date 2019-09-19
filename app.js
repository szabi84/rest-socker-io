'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const sockets = {};

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.get('/1', function (req, res) {
    sockets[1].emit('message', {message: 'Nesze 1'});
    res.send('Ok');
});

app.get('/2', function (req, res) {
    sockets[2].emit('message', {message: 'Nesze 2'});
    res.send('Ok');
});

app.get('/bc', function (req, res) {
    io.sockets.emit('message', {message: 'Nesze Mindenki'});
    res.send('Ok');
});


io.on('connection', function (socket) {
    socket.emit('welcome', {message: 'Welcome!'});
    socket.on('indentify', function (data) {
        sockets[data.id] = socket;
        socket.emit('message', 'You are the ' + data.id);
    });
    socket.on('i am client', function () {
        console.log('received a message from the client.');
    });
});

// convertPdf.convertFile('/home/szabi/Documents/pdf/METABOX méretezés és szerelési útmutató.pdf', '/home/szabi/Documents/images')
//     .then((imagesPath) => {
//         console.log(imagesPath);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
