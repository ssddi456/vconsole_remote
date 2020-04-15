import * as express from "express";
import * as path from "path";
import * as ws from 'ws';
import * as http from 'http';
import * as socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function( ){
    
});

app.listen(function(){
    console.log('app .listen, ', app.port)
});
