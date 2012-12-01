/**
 * depend on underscore.js
 */


(function() {
    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;

    // Save the previous value of the `utils` variable.
    var previousUnderscore = root.utils;

    // Create a safe reference to the utils object for use below.
    var utils = function(obj) {
        if (obj instanceof utils) return obj;
        if (!(this instanceof utils)) return new utils(obj);
        this._wrapped = obj;
    };

    utils.isEmpty = function(string){
        return  _.isBlank(string) && _.isNull(string) && _.isUndefined(string);
    }

    utils.isNotEmpty = function(string){
        return  !_.isBlank(string) && !_.isNull(string) && !_.isUndefined(string);
    }


    utils.isArrayEmpty = function(arr){
       return  _.isArray(arr) && !_.isUndefined(arr) && _.size>0;
    }
}).call(this);

