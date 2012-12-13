

var mongoose = require('mongoose');
var mongodb = require('./mongolab-db');
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

var UserSchema = mongoose.Schema({
    name: 'String',
    password: 'String',
    faceId: 'String',
    gender: { type: String, default: '未知' },
    email:'String',
    regTime:{ type: Date, default: Date.now },
    face: {
        thumbnails : String
        ,media  : String
        ,big:   String
    }
},schemaOptions);





var User = mongodb.db.model('User', UserSchema);
module.exports = User;

//virtual property need definded behind User
var faceUrl = UserSchema.virtual('faceUrl');
faceUrl.get(function(){
    this.face.thumbnails = cloudinary.genSmallFace(this.faceId);
    this.faceUrl = this.face.thumbnails;
    return this.faceUrl;
});

UserSchema.virtual('regTimeStr');
UserSchema.virtual('flyAge');

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
});


User.computeFlyAge = function(user){

    if(utils.isNotEmpty(user.regTime)){
        var now = moment(new Date());
        var regTime = moment(user.regTime);
        user.flyAge = now.diff(regTime,'days');
    }
    return user;
};


User.generateNormalFaceUrl = function(user){
    user.faceUrl = cloudinary.genBlogFace(user.faceId);
};

User.formatRegTime = function(user){
    if(utils.isNotEmpty(user.regTime)){
        user.regTimeStr = moment(user.regTime).format('YYYY年MMMDD a h:mm:ss');
        console.log('user regtime: '+ user.regTimeStr);
    }
    return user;
};

User.adjustInformation = function(user){
    User.generateNormalFaceUrl(user);
    User.formatRegTime(user);
    User.computeFlyAge(user);
    return user;
}



/**
 *
 User.prototype.genEditFace = function(user){
    if(_.isNull(user.faceId) || _.isUndefined(user.faceId)){
        user.faceUrl = cloudinary.genDefaultFaceUrl();
    }

    return user;
}
var mongodb = require('./db')
function User(user){
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(callback){

    console.log('start save user......');
    var user = {
        name: this.name,
        password: this.password
    };

    mongodb.open(function(err, db){
        if(err){
            console.log(err);
            return callback(err);
        }

        db.collection('users', function(err, collection){
            if(err){
                console.log(err);
                mongodb.close();
                return callback(err);
            }

            collection.ensureIndex('name',{unique: true});
            collection.insert(user, {safe:true}, function(err,user){
                mongodb.close();
                callback(err,user);
            })
        })
    })

    console.log('saveing success');
};

User.get = function get(username, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.findOne({name:username},function(err, doc){
                mongodb.close();
                if(doc){
                    var user = new User(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
            })
        })

    })
}
 **/