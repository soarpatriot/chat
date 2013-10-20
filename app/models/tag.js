

var mongoose = require('mongoose');
    Schema = mongoose.Schema;
var utils = require('./utils');



var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true


var schemaOptions = {
    toJSON: {
        virtuals: true
    }
};


var TagSchema = mongoose.Schema({
    key:'String',
    name: 'String',
    description: 'String'
},schemaOptions);

var Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;


