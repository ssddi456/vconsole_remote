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
    console.log('connected?', socket.id);
    
    const broadcastEvents = [
        'dispatch_event',
        'printRepeatLog',
        'printNewLog',
    ];

    broadcastEvents.forEach(function (event) {
        socket.on(event, function (e) {
            console.log(event, socket.id, e);
            socket.broadcast.emit(event, e);
        });
    })
    // 需要绑定&重连机制
    socket.on('reqFoldedLineContent', function (id: string, msg: string, callback: (data: any) => any) {
        // send a private message to the socket with the given id
        var receiver = io.sockets.connected[id];
        console.log('send reqFoldedLineContent req', id, msg, !!receiver, Object.keys(io.sockets.connected),
            receiver == socket);
        if (receiver) {
            receiver.emit('reqFoldedLineContent', msg, function (data: string) {
                console.log('reqFoldedLineContent:', data);
                callback(data);
            });
        }
    });
});

var listener = server.listen(51753, function () {
    console.log('app .listen, ', listener.address().port)
});
