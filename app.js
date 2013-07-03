
/**
 * Module dependencies.
 */


    //, stylus = require('stylus')
    //, nib = require('nib')
var io = require('./app/models/socket.js')
    , http = require('http');

//config
var env = require('./config/environment');

//NODE_ENV=development supervisor app

options = {
    path: __dirname,
    port:process.env.PORT || 6000,
    env: process.env.NODE_ENV || "development"
}
var app = env.createEnv(options);

var server = http.createServer(app).listen(options.port, function(){
    console.log("Express server listening on port " + options.port);
});

//socket.io  and node js module;
io.listenServer(server);

