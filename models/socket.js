
var io = require('socket.io');
var socketModule={};
module.exports = socketModule;

socketModule.listenServer = function(server){
    io = io.listen(server);

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
            //  fn(true);
            // console.log("nicknames 111" + nicknames);
            //}else{
            //  fn(false);
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

            delete  nicknames[socket.nickname];
            socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
            socket.broadcast.emit('nicknames', nicknames);
        });


    });

}
//http.createServer(app).listen(app.get('port'), function(){
//console.log("Express server listening on port " + app.get('port'));
//});

