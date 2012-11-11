

var mongoose = require('mongoose');
var mongodb = require('./mongolab-db');
var cloudinary = require('../models/cloudinary.js');
var _ = require('underscore');

var UserSchema = mongoose.Schema({
    name: 'String',
    password: 'String',
    faceUrl:{type:'String',default: 'http://res.cloudinary.com/demo/image/facebook/w_100,h_100,c_fill,d_avatar2.png/non_existing_id.jpg'},
    email:'String',
    regTime:{ type: Date, default: Date.now }
});
var User = mongodb.db.model('User', UserSchema);

var defaultFaceUrl = 'http://res.cloudinary.com/demo/image/facebook/w_150,h_150,c_fill,d_avatar2.png/non_existing_id.jpg';

_.defaults(User, {faceUrl: defaultFaceUrl, regTime : Date.now});

module.exports = User;
UserSchema.pre('save', function (next) {
    console.log('user get method internal..');
    if(null === this.faceUrl || ''===this.faceUrl){
        console.log('user get method internal..');
        this.faceUrl = 'http://res.cloudinary.com/demo/image/facebook/w_150,h_150,c_fill,d_avatar2.png/non_existing_id.jpg'
    }
    next();
});

UserSchema.pre('update', function (next) {
    console.log('user get method internal..');
    if(null === this.faceUrl || ''===this.faceUrl){
        console.log('user get method internal..');
        this.faceUrl = 'http://res.cloudinary.com/demo/image/facebook/w_150,h_150,c_fill,d_avatar2.png/non_existing_id.jpg'
    }
    next();
});




UserSchema.path('faceUrl').set(function () {
    console.log('user get method..');
    if(null === this.faceUrl || ''===this.faceUrl){
        console.log('user get method internal..');
        this.faceUrl = 'http://res.cloudinary.com/demo/image/facebook/w_150,h_150,c_fill,d_avatar2.png/non_existing_id.jpg'
    }
    return this.faceUrl;
});
/**
 *
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