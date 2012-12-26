
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
    uploader = require('./routes/uploader');


//helpers


//error-handle
var error = require('./routes/error')

//debugs
var expressError = require('express-error');


var settings = require('./settings');
var MongoStore = require('connect-mongo')(express);

var partials = require('express-partials');
var flash = require('connect-flash');

var sessionStore = new MongoStore({
                        url:settings.currentDb()
                    }, function(){
                        console.log('connect mongodb success........');
                    });


var app = express()
   // , server = require('http').createServer(app)
   // , io = io.listen(server);
//server.listen(process.env.PORT);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //app.use(partials());
  app.use(flash());

  app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  app.use(express.bodyParser({uploadDir:__dirname+'/tmp'}));
  app.use(express.methodOverride());

  app.use(express.cookieParser());
  app.use(express.session({
      secret : settings.cookie_secret,
      cookie : {
          maxAge :  60000 * 30
      },
      store : sessionStore
  }));
  app.use(app.router);
  app.use(error);
  app.use(express.static(path.join(__dirname, 'public')));



    //expose
   // app.expose(Utils, 'Utils').helpers(Utils);
});

/**
app.configure('development', function(){
  app.use(express.errorHandler());
});
 **/
app.configure('development', function() {
    app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));
});



app.get('/', home.index);

app.get('/chat', chat.index);

app.get('/post',post.index);
app.post('/post',post.publish);
app.get('/post/:id', post.get);

app.get('/posts',post.all);
app.get('/posts/:id',post.one);
app.post('/posts',post.up);
app.put('/posts/:id',post.up);

app.post('/comment',post.comment);

app.get('/u/:user', user.index);
app.get('/reg', user.reg);
app.post('/reg', user.doReg);

app.post('/login', user.doLogin);
app.get('/login', user.login);

app.get('/logout', user.logout);



app.get('/user',user.show);
app.get('/user/edit',user.edit);

app.post('/user',user.updateProfile);

app.post('/upload-face',uploader.uploadFace);

app.get('/file-picker',uploader.filePicker)


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