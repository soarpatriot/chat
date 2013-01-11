/**
 * review the post
 * @type {*}
 */

var Post = require('../models/post.js'),
    utils = require('../models/utils');

var User = require('../models/user.js');


var cloudinary = require('../models/cloudinary.js');


var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

var moment = require('moment');
moment.lang('zh-cn');

exports.index = function(req, res){
    res.render('review/review-show', {
        title: '审阅',
        currentLink: 'REVIEW',
        user:req.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};