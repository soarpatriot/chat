var express = require('express');

module.exports = function (app) {
    var cookie_secret = 'secret_meteoric';
    var MongoStore = require('connect-mongo')(express);
    var sessionStore = new MongoStore({
        url: app.get('db-url')
    }, function(){
        console.log('production session in mongo success........');
    });

    app.configure('production', function () {
        console.log("dev production start!");
        //app.enable('log actions');
        //app.enable('env info');
        app.enable('quiet');
        app.enable('view cache');
        app.enable('model cache');
        app.enable('eval cache');

        app.use(express.session({
            secret : cookie_secret,
            cookie : {
                maxAge :  1000 * 60 * 60 * 24 * 20
            },
            store : sessionStore
        }));
        app.use(require('express').errorHandler());
        app.settings.quiet = true;
    });
    /**
    var cookie_secret = 'secret_meteoric';

    var redis = require(app.get('path')+'/app/models/redis');

    var RedisStore = require('connect-redis')(express);
    var redisStore = new  RedisStore({
        client:redis.client
    });


    app.configure('production', function () {
        app.enable('merge javascripts');
        app.enable('merge stylesheets');
        app.disable('assets timestamps');
        app.use(express.session({
            secret : cookie_secret,
            cookie : {
                maxAge :  1000 * 60 * 60 * 24 * 365
            },
            store : redisStore
        }));
        app.use(require('express').errorHandler());
        app.settings.quiet = true;
    });**/
};
