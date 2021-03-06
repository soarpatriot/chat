exports.createEnv = function (options) {

    var express = require('express')
        , path = require('path');

    //debugs
    var expressError = require('express-error');
    var partials = require('express-partials');
    var flash = require('connect-flash');
    var uuid = require('node-uuid');
    //var route = require('./routes');
    //var app = express();

    var express        = require('express');
    var morgan         = require('morgan');
    var bodyParser     = require('body-parser');
    var methodOverride = require('method-override');
    var app            = express();
    var logger = require('../log4js').logger('app');
    logger.info("Start!");
    
    //app.configure(function(){
        app.enable('trust proxy');
        app.set('port', options.port);
        app.set('env', options.env);
        app.set('path',options.path);

        app.set('views',options.path+'/app/views');
        app.set('view engine', 'jade');

        //app.use(partials());
        app.use(flash());

        app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
        app.use(morgan('dev'));                     // log every request to the console
        app.use(bodyParser());                      // pull information from html in POST
        app.use(methodOverride());                  // simulate DELETE and PUT
        
        //app.use(express.favicon("public/images/magnify.png"));
        //app.use(express.cookieParser());
        //app.use(express.urlencoded())
        //app.use(express.json())
        //app.use(express.bodyParser());
        // app.use(express.bodyParser({uploadDir:__dirname+'/tmp'}));
        //app.use(express.methodOverride());

        //app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));
        //connect.errorHandler({ stack: true, dump: true })
        app.use(function(err, req, res, next){
            console.error(err.stack);
            res.send(500, 'Something broke!');
        });

    //});

    //init db and schema
    var mongoose = require("./mongoose");
    mongoose.init(app,options);

    //load environments configure
    

    //app.configure(function(){

        //app.use(express.static(path.join(options.path, 'public')));
        //app.use(express.logger('dev'));
        //app.use(app.router);

    //});

    //route.createRoutes(express);
    var router = express.Router();
    router.get('/', function(req, res){
      res.send('hello world');
    });
    return app;
};


















/**
 *
 *
 *     var upload = require('jquery-file-upload-middleware');

 // configure upload middleware
 upload.configure({
        uploadDir: options.path+'/public/upload',
        uploadUrl: '/upload'
    });

 * app.use('/upload', function (req, res, next) {
            // imageVersions are taken from upload.configure()
            upload.fileHandler()(req, res, next);

            //
        });
 upload.on('begin', function (fileInfo) {
            var originName= fileInfo.originalName;
            var extPosi = originName.lastIndexOf(".");
            var extName = originName.substr(extPosi);
            var newName = uuid.v1();
            fileInfo.name = newName+extName;
            // fileInfo structure is the same as returned to browser
            // {
            //     name: '3 (3).jpg',
            //     originalName: '3.jpg',
            //     size: 79262,
            //     type: 'image/jpeg',
            //     delete_type: 'DELETE',
            //     delete_url: 'http://yourhost/upload/3%20(3).jpg',
            //     url: 'http://yourhost/uploads/3%20(3).jpg',
            //     thumbnail_url: 'http://youhost/uploads/thumbnail/3%20(3).jpg'
            // }
        });
 upload.on('end', function (fileInfo) {

            //cloudinary.uploader.upload(options.path+'/temp/'+fileInfo.name, function(result) {
                //fileInfo.url = result.url;
               // console.log(result)
            //});
        });

 **/