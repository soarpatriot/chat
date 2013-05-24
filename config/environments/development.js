var express = require('express');

module.exports = function (app) {
    var cookie_secret = 'secret_meteoric';
    var MongoStore = require('connect-mongo')(express);
    var db = require('../database');

    var settings = require('../../settings');
    var dbUrl = settings.currentDb();

    var sessionStore = new MongoStore({
        //url:db[app.get('env')].url
        url: dbUrl
    }, function(){
        console.log('connect mongodb success........');
    });

    app.configure('development', function () {
        console.log("dev environment start!");
        app.enable('log actions');
        app.enable('env info');
        app.enable('watch');
        app.use(express.session({
            secret : cookie_secret,
            cookie : {
                maxAge :  1000 * 60 * 60 * 24 * 365
            },
            store : sessionStore
        }));
        app.use(require('express').errorHandler({ dumpExceptions: true, showStack: true }));
    });
};
