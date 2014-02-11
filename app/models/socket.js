
var io = require('socket.io');
var socketModule={};
module.exports = socketModule;

socketModule.listenServer = function(port){
    io = io.listen(port);

    var nicknames = {};

    io.sockets.on('connection', function (socket) {
        socket.on('user message',function(msg){
            socket.broadcast.emit('user message',socket.nickname, msg);
            socket.emit('user message', socket.nickname, msg);
            console.log("nicknames and msg" + socket.nickname+msg );

        });

        socket.on('nickname',function(nick){
            console.log('nicknames' + nicknames);

            nicknames[nick] = socket.nickname = nick;
            socket.broadcast.emit('announcement', nick + ' connected');
            socket.emit('nickname', nicknames);

            console.log("nicknames " + nicknames);

        });

        socket.on('disconnect', function(){
            if(!socket.nickname){
                return;
            }

            delete  nicknames[socket.nickname];
            socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
            socket.broadcast.emit('nicknames', nicknames);
        });
    });
}
