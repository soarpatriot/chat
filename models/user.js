

var mongoose = require('mongoose');
var mongodb = require('./mongolab-db');

var UserSchema = mongoose.Schema({ name: 'String',password: 'String' });
var User = mongodb.db.model('User', UserSchema);



module.exports = User;


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