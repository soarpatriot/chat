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

    var weibo = require('weibo');
    weibo.init('weibo', '1122960051', 'e678e06f627ffe0e60e2ba48abe3a1e3');
    weibo.init('github', '8e14edfda73a71f1f226', '1796ac639a8ada0dff6acfee2d63390440ca0f3b');
    weibo.init('tqq', '801196838', '9f1a88caa8709de7dccbe3cae4bdc962');

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
        app.set('views',options.path+'/views');
        app.set('view engine', 'jade');

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
        app.use(app.router);
        //app.use(error);
        app.use(express.static(path.join(options.path, 'public')));

        app.use(express.logger('dev'));
        app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));

        weibo.oauth({
            loginPath: '/login',
            logoutPath: '/logout',
            blogtypeField: 'type',
            afterLogin: function (req, res, callback) {
                console.log(req.session.oauthUser.screen_name, 'login success');
                //process.nextTick(callback);
                next();
            },
            beforeLogout: function (req, res, callback) {
                console.log(req.session.oauthUser.screen_name, 'loging out');
                //process.nextTick(callback);
                next();
            }
        });
        //connect.errorHandler({ stack: true, dump: true })
        app.use(function(err, req, res, next){
            console.error(err.stack);
            res.send(500, 'Something broke!');
        });

    });

    route.createRoutes(app);
    return app;
};
