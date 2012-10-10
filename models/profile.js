

var mongoose = require('mongoose');
var mongodb = require('./mongolab-db');

var ProfileSchema = mongoose.Schema({ name: 'String',password: 'String' });
var Profile = mongodb.db.model('Profile', ProfileSchema);



module.exports = Profile;

