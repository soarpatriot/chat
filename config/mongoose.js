exports.init = function (app) {
    var conf = require('./database.js')[app.get('env')];
    var mongoose = require('mongoose');
    mongoose.connect(conf.url);
    require(app.path + '/db/schema')(mongoose, app);
};