

var mongoose = require('mongoose');
var mongodb = require('./mongolab-db'),
    Schema = mongoose.Schema;
var cloudinary = require('../models/cloudinary.js');
var utils = require('./utils');



var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true




var moment = require('moment');
moment.lang('zh-cn');


var schemaOptions = {
    toJSON: {
        virtuals: true
    }
};

//Post's Vote
var Vote  = mongoose.Schema({
    postId: {type: Schema.ObjectId, ref: 'Post'},
    favor:Boolean,
    voteDate:  { type: Date, default: Date.now }
},schemaOptions);

var UserSchema = mongoose.Schema({
    name: 'String',
    password: 'String',
    faceId: 'String',
    gender: { type: String, default: '未知' },
    email:'String',
    regTime:{ type: Date, default: Date.now },
    votePosts:[Vote]
},schemaOptions);


//virtual properties
var fromNow = UserSchema.virtual('fromNow');
fromNow.get(function(){
    return moment(this.regTime).fromNow();
});

//virtual property need definded behind User
var mini = UserSchema.virtual('mini');
mini.get(function(){
    return cloudinary.genMiniFace(this.faceId);
});

var thumbnails = UserSchema.virtual('thumbnails');
thumbnails.get(function(){
    return cloudinary.genSmallFace(this.faceId);
});

var normalFace = UserSchema.virtual('normalFace');
normalFace.get(function(){
    return cloudinary.genBlogFace(this.faceId);
});

var regTimeStr = UserSchema.virtual('regTimeStr');
regTimeStr.get(function(){
    if(utils.isNotEmpty(this.regTime)){
        return moment(this.regTime).format('YYYY年MMMDD a h:mm:ss');
    }
});

var flyAge = UserSchema.virtual('flyAge');
flyAge.get(function(){
    if(utils.isNotEmpty(this.regTime)){
        var now = moment(new Date());
        var regTime = moment(this.regTime);
        return now.diff(regTime,'days');
    }
});


var User = mongodb.db.model('User', UserSchema);
module.exports = User;






/*
 UserSchema.pre('save', function (next) {
 console.log('this face url: '+this.faceUrl);
 if(_.isNull(this.faceUrl) || _.isUndefined(this.faceUrl)){
 console.log('default face url: '+cloudinary.genDefaultFaceUrl());
 this.faceUrl = cloudinary.genDefaultFaceUrl();
 };
 next();
 });



 UserSchema.pre('update', function (next) {
 console.log('this face url: '+this.faceUrl);
 if(_.isNull(this.faceUrl) || _.isUndefined(this.faceUrl)){
 console.log('default face url: '+cloudinary.genDefaultFaceUrl());
 this.faceUrl = cloudinary.genDefaultFaceUrl();
 };
 next();
 });**/