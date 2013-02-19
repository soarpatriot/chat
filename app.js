
/**
 * Module dependencies.
 */


    //, stylus = require('stylus')
    //, nib = require('nib')
var io = require('./models/socket.js')
    , http = require('http');

//config
var env = require('./config/environment');


//var app = express();
//set environments
options={
    path: __dirname
}
var app = env.createEnv(options);

var port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port, function(){
    console.log("Express server listening on port " + port);
});

//socket.io  and node js module;
io.listenServer(server);

