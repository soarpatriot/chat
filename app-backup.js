/**
 * Module dependencies.
 */

var express = require('express')
//, stylus = require('stylus')
//, nib = require('nib')
    , io = require('socket.io')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');



var app = express()
// , server = require('http').createServer(app)
// , io = io.listen(server);
//server.listen(process.env.PORT);

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

io = io.listen(server);
//http.createServer(app).listen(app.get('port'), function(){
//console.log("Express server listening on port " + app.get('port'));
//});

var nicknames = {};

io.sockets.on('connection', function (socket) {
    socket.on('user message',function(msg){
        socket.broadcast.emit('user message',socket.nickname, msg);
        socket.emit('user message', socket.nickname, msg);
        console.log("nicknames and msg" + socket.nickname+msg );

    });

    socket.on('nickname',function(nick){
        console.log('nicknames' + nicknames);
        //if(nicknames[nick]){
        // fn(true);
        // console.log("nicknames 111" + nicknames);
        //}else{
        // fn(false);
        nicknames[nick] = socket.nickname = nick;
        socket.broadcast.emit('announcement', nick + ' connected');
        socket.emit('nickname', nicknames);

        console.log("nicknames " + nicknames);

        //}
    });

    socket.on('disconnect', function(){
        if(!socket.nickname){
            return;
        }
        delete nicknames[socket.nickname];
        socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
        socket.broadcast.emit('nicknames', nicknames);
    });


});