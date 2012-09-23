
var mongodb = require('./mongolab-db');

var schema = mongodb.mongoose.Schema({ name: 'string' });
var Cat = mongodb.db.model('Cat', schema);


module.exports = Cat;

