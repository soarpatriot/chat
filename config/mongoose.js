
var mongoose = require('mongoose');
var conf = {};
exports.init = function (app,options) {
    var conf = require('./database.js')[options.env];
    console.log("conf:"+conf.url);
    //var mongoose = require('mongoose');
    //mongoose.connect(conf.url);
    //require(options.path + '/db/schema')(mongoose, app);
};

exports.config = function(){
    return conf;
}