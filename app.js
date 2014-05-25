
/**
 * Module dependencies.
 */

/**

var io = require('./app/models/socket.js')
    , http = require('http');

//config
var env = require('./config/environment');

//NODE_ENV=development supervisor app

options = {
    path: __dirname,
    port:process.env.PORT || 9000,
    env: process.env.NODE_ENV || "development"
}
var app = env.createEnv(options);

var server = http.createServer(app).listen(options.port, function(){
    console.log("Express server listening on port " + options.port);
});

//socket.io  and node js module;
io.listenServer(server);**/
var options = {
    path: __dirname,
    port:process.env.PORT || 9000,
    env: process.env.NODE_ENV || "development"
};
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session')
var route = require('./config/routes');

var app = express();
var http = require("http");
var envDev = require('./config/environments/development');
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');




app.use(favicon(path.join(__dirname, 'public/images/eye.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//envDev(app);
app.use(cookieParser());
//app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true });
app.use(session({
    secret : "keyboard cat",
    cookie : {
        maxAge :  1000 * 60 * 60 * 24 * 365
    }
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));



var mongoose = require("./config/mongoose");
    mongoose.init(app,options);

route.createRoutes(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = http.createServer(app).listen(options.port, function(){
    console.log("Express server listening on port " + options.port);
});

module.exports = app;


