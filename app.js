var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    socket.on('new player', function(newPlayer){
        io.emit('new player', newPlayer);
    });
    socket.on('player position', function(object){
        io.emit('player position', object);
    });
    socket.on('player action', function(object){
        io.emit('player action', object);
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:3000');
});