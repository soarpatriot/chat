
/**
 * Module dependencies.
 */

/**

var io = require('./app/models/socket.js')
    , http = require('http');
**/
var options = {
    path: __dirname,
    port:process.env.PORT || 9000,
    env: process.env.NODE_ENV || "development"
};

var socket_url = "/data/www/chat/shared/tmp/sockets/app.socket",
      production_env = 'production',
      express = require('express'),
      compression = require('compression'),
      path = require('path'),
      favicon = require('static-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      flash = require('connect-flash'),
      session = require('express-session'),
      RedisStore = require('connect-redis')(session),
      route = require('./config/routes'),
      app = express(),
      http = require("http"),
      envDev = require('./config/environments/development'),
      redisConfig = require('./config/redis-config'),
      mongoose = require("./config/mongoose");

app.locals.appVersion = '0.7.2';
app.locals.env = options.env;

if(production_env===options.env){
    app.locals.jsPath = '/build'
}else{
    app.locals.jsPath = '/javascripts'
}

app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images/eye.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
//envDev(app);
app.use(cookieParser());

app.use(session({ store: new RedisStore(redisConfig[options.env]['options']), 
      secret: 'keyboard cat' ,
      cookie : {
        maxAge :  1000 
      }
}))
/**
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true });

app.use(session({
    secret : "keyboard cat",
    cookie : {
        maxAge :  1000 * 60 * 60 * 24 * 365
    }
}));**/

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',express.static(path.join(__dirname, 'bower_components')));

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
if (options.env === 'development') {
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

if(production_env===options.env){
   var server = http.createServer(app).listen(socket_url, function(){
      console.log("Express server listening on socket..... " );
   });
}else{
  var server = http.createServer(app).listen(options.port, function(){
        console.log("Express server listening on port " + options.port);
  });
}

module.exports = app;


