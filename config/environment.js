exports.createEnv = function (options) {

    var express = require('express')
        , path = require('path');
    //debugs
    var expressError = require('express-error');
    var flash = require('connect-flash');
    var route = require('./routes');
    var app = express();

    app.configure(function(){
        app.set('port', options.port);
        app.set('env', options.env);
        app.set('path',options.path);

        app.set('views',options.path+'/app/views');
        app.set('view engine', 'jade');

        //app.use(partials());
        app.use(flash());

        app.use(express.favicon());
        app.use(express.cookieParser());

        //app.use(express.bodyParser());
        app.use(express.bodyParser({uploadDir:__dirname+'/tmp'}));
        app.use(express.methodOverride());

        app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));
        //connect.errorHandler({ stack: true, dump: true })
        app.use(function(err, req, res, next){
            console.error(err.stack);
            res.send(500, 'Something broke!');
        });

    });

    //init db and schema
    //var mongoose = require("./mongoose");
    //mongoose.init(app,options);

    //load environments configure
    require("./environments/"+options.env)(app);

    app.configure(function(){

        app.use(express.static(path.join(options.path, 'public')));
        app.use(express.logger('dev'));
        app.use(app.router);

    });


    route.createRoutes(app);
    return app;
};
