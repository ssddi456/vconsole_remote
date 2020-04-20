import * as express from "express";
import * as path from "path";
import * as ws from 'ws';
import * as http from 'http';
import * as socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
    console.log('connected?');

    socket.on('dispatch_event', function (e) {
        console.log('dispatch_event', socket.id, e);
        socket.broadcast.emit('dispatch_event', e);
    });
});

var listener = server.listen(51753, function () {
    console.log('app .listen, ', listener.address().port)
});
