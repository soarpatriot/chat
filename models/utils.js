var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true


var utils = {};
/**
 * custom function
 *
 * if the string is not undefined and not blank and not null
 *
 * return true;
 *
 * trim space, remove \n
 */
utils.isEmpty = function(string){
   return  _.isBlank(string) || _.isNull(string) ||  _.isUndefined(string);
}

utils.isNotEmpty = function(string){
    return  !_.isBlank(string) && !_.isNull(string) && !_.isUndefined(string);
}

utils.isObjEmpty = function(obj){
    return   _.isNull(obj) || _.isUndefined(obj);
}

module.exports = utils;