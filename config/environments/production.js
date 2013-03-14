module.exports = function (app) {

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
    });
};
