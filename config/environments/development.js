
module.exports = function (app) {



    var express      = require('express')
  , cookieParser = require('cookie-parser')
  , session      = require('express-session')
  , app = express()

app.use(cookieParser()) // required before session.
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}))
    
    /**
    var cookie_secret = 'secret_meteoric';
    var MongoStore = require('connect-mongo')(express);
    var sessionStore = new MongoStore({
        url: app.get('db-url')
    }, function(){
        console.log('session in mongo success........');
    });

    //app.configure('development', function () {
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
        //app.use(require('express').errorHandler({ dumpExceptions: true, showStack: true }));
    //});**/
};
