exports.createEnv = function (options) {

    var express = require('express')
        , path = require('path');
    //debugs
    var expressError = require('express-error');
    var flash = require('connect-flash');

    var cookie_secret = 'secret_meteoric';
    var settings = require('../settings');
    var redis = require('../models/redis');
    var route = require('./routes')
    var MongoStore = require('connect-mongo')(express);
    var RedisStore = require('connect-redis')(express);

    var app = express();

    var sessionStore = new MongoStore({
        url:settings.currentDb()
    }, function(){
        console.log('connect mongodb success........');
    });


    var redisStore = new  RedisStore({
        client:redis.client
    });




    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('env', options.env || 'development');
        app.set('views',options.path+'/views');
        app.set('view engine', 'jade');
        app.set('path',options.path);

        //app.use(partials());
        app.use(flash());

        app.use(express.favicon());

        //app.use(express.bodyParser());
        app.use(express.bodyParser({uploadDir:__dirname+'/tmp'}));
        app.use(express.methodOverride());

        app.use(express.cookieParser());
        app.use(express.session({
            secret : cookie_secret,
            cookie : {
                maxAge :  1000 * 60 * 60 * 24 * 365
            },
            store : sessionStore
        }));

        app.use(express.logger('dev'));

        app.use(app.router);
        app.use(express.static(path.join(options.path, 'public')));
        app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));


        //connect.errorHandler({ stack: true, dump: true })
        app.use(function(err, req, res, next){
            console.error(err.stack);
            res.send(500, 'Something broke!');
        });

    });
    //db.init(app);
    route.createRoutes(app);
    return app;
};
