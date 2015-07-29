var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

var players = {};

io.on('connection', function(socket){
    socket.on('new player', function(newPlayer){
        players[newPlayer] = {};
        io.emit('new player', newPlayer);
        socket.emit('new game', players);
    });
    socket.on('player action', function(object){
        //console.log(players)
        //console.log(object.name);
        if(players[object.name]){
            players[object.name].cursor = object.cursor;
            players[object.name].cursorUp = object.cursorUp;
            players[object.name].positionX = object.x;
            players[object.name].positionY = object.y;
        }
        io.emit('player action', object);
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:3000');
});