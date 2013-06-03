
var mongoose = require('mongoose')
    , fs = require('fs');

exports.init = function (app,options) {

    var conf = require('./database.js')[options.env];
    mongoose.connect(conf.url);
    app.set('db-url',conf.url);
    var models_path = options.path + '/app/models'
    fs.readdirSync(models_path).forEach(function (file) {
        require(models_path+'/'+file)
    })
    console.log("conf:"+conf.url);
    console.log('connect mongo db success..');
};

