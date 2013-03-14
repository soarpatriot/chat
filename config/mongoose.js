
exports.init = function (app,options) {
    var conf = require('./database.js')[options.env];
    var mongoose = require('mongoose');
    mongoose.connect(conf.url);
    require(options.path + '/db/schema')(mongoose, app);
};