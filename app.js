
/**
 * Module dependencies.
 */

var express = require('express')
    ,expose = require('express-expose')

    //, stylus = require('stylus')
    //, nib = require('nib')
    ,io = require('./models/socket.js')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

//routes
var home = require('./routes/index')
    post = require('./routes/post'),
    user = require('./routes/user'),
    chat = require('./routes/chat'),
    review = require('./routes/review'),
    uploader = require('./routes/uploader');


//helpers
var _  = require('underscore');
var redis = require('./models/redis');
//error-handle
var error = require('./routes/error')

//debugs
var expressError = require('express-error');

var settings = require('./settings');

var MongoStore = require('connect-mongo')(express);
var RedisStore = require('connect-redis')(express);

var partials = require('express-partials');
var flash = require('connect-flash');



var app = express();
   // , server = require('http').createServer(app)
   // , io = io.listen(server);
//server.listen(process.env.PORT);
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
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

      //app.use(partials());
    app.use(flash());

    app.use(express.favicon());

      //app.use(express.bodyParser());
    app.use(express.bodyParser({uploadDir:__dirname+'/tmp'}));
    app.use(express.methodOverride());

    app.use(express.cookieParser());
    app.use(express.session({
        secret : settings.cookie_secret,
        cookie : {
            maxAge :  1000 * 60 * 60 * 24 * 365
        },
        store : redisStore
    }));
    app.use(app.router);
    //app.use(error);
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.logger('dev'));
    app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));


});

/**
 * detail routes
 */
app.get('/',user.loadUser, home.index);

app.get('/chat', chat.index);

app.get('/post',post.index);
app.post('/post',post.publish);

app.get('/posts/review',post.review);
app.get('/post/:id', post.get);

app.get('/posts',post.all);
app.get('/posts/:id',post.one);
app.post('/posts',post.up);
app.put('/posts/:id',post.up);
app.post('/posts/createReview',post.createReview);

app.post('/comment',post.comment);


app.get('/reg', user.reg);
app.post('/reg', user.doReg);

app.post('/login', user.doLogin);
app.get('/login', user.login);

app.get('/logout', user.logout);

app.get('/user/edit',user.edit);
app.get('/user/:userId', user.index);
app.get('/user',user.loadUser,user.show);
app.post('/user',user.updateProfile);
app.put('/users',user.update);

app.post('/upload-face',uploader.uploadFace);
app.get('/file-picker',uploader.filePicker);

//review post
app.get('/review',review.index)

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


//socket.io  and node js module;
io.listenServer(server);


/**
 * app.error(function(err, req, res, next){
    console.error('my error!!'+err.stack);
    if (err instanceof NotFound) {
        res.render('404.jade');
    } else {
        next(err);
    }
});

 **/


// the defination of development

/**
 // the defination of production
 app.configure('production', function(){
    var sessionStore = new MongoStore({
        url:settings.remoteMongolab
    }, function(){
        console.log('connect mongodb success........');
    });

    app.use(express.logger('dev'));
    app.use(express.session({
        secret : settings.cookie_secret,
        cookie : {
            maxAge :  1000 * 60 * 60 * 24 * 60    //one year
        },
        store : sessionStore
    }));
});

 app.configure('development', function(){
  app.use(express.errorHandler());
});




 app.use(app.router,function(req, res, next){
        res.locals.expose = {};
        // you could alias this as req or res.expose
        // to make it shorter and less annoying
        console.log("sssssssssssssssssssssssssssssssss");
        next();
    });

 // pretend we loaded a user

 app.use(function(req, res, next){
        var userId = req.session.userId;
        if(!_.isNull(userId) && !_.isUndefined(userId)){
            User.findOne({'_id': userId}, function(err, user){
                if(err){
                    req.flash('error',err);
                    console.log(err);
                    return res.redirect('/');
                }else{
                    req.user = user;
                    res.locals.expose.user = user;

                    console.log("sd load user:");
                }
                next();
            });
        }else{
            console.log("sd load user:");
            next();
        }
    });

 app.configure('development', function(){
    app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));


});
 app.use(app.router,function(req, res, next){
        res.locals.expose = {};
        // you could alias this as req or res.expose
        // to make it shorter and less annoying
        console.log("sssssssssssssssssssssssssssssssss");
        next();
    });
 //expose
 // app.expose(Utils, 'Utils').helpers(Utils);
 **/
