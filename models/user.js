

var mongoose = require('mongoose');
var mongodb = require('./mongolab-db');
var cloudinary = require('../models/cloudinary.js');
var _ = require('underscore');

var UserSchema = mongoose.Schema({
    name: 'String',
    password: 'String',
    faceUrl:{type:'String'},
    email:'String',
    regTime:{ type: Date, default: Date.now }
});
var User = mongodb.db.model('User', UserSchema);

module.exports = User;


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