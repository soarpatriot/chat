



var mongoose = require('mongoose');
var mongodb = require('./mongolab-db');
var moment = require('moment');
moment.lang('zh-cn');


var PostSchema = mongoose.Schema({
    username: 'String',
    content: 'String',
    pusTime: { type: Date, default: Date.now }
});
var Post = mongodb.db.model('Post', PostSchema);


Post.prototype.searchTop10 = function(callback){
    return Post.where()
        .limit(5)
        .sort('-pusTime')
        .exec(callback);

};
Post.prototype.formatDate = function(posts){
    for(var i=0; i<posts.length; i++){
        posts[i].fromNow = moment(posts[i].pusTime).fromNow();
    }

    return posts;
};

module.exports = Post;

/**
var mongodb = require('./db')

function Post(username, post, time){
    this.user = username
    this.post = post
    if(time){
        this.time = time;
    }else{
        this.time = new Date();
    }
}
module.exports = Post;

Post.prototype.save = function save(callback){

     console.log('start save Post......');
     var post = {
         user: this.user,
         post: this.post,
         time: this.time
     };

     mongodb.open(function(err, db){
         if(err){
             console.log(err);
             return callback(err);
         }

         db.collection('posts', function(err, collection){
             if(err){
                 console.log(err);
                 mongodb.close();
                 return callback(err);
             }

             collection.ensureIndex('user');
             collection.insert(post, {safe:true}, function(err,post){
                 mongodb.close();
                 callback(err,post);
             })
         })
     })

    console.log('saveing success');
};

Post.get = function get(username, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('posts',function(err,collection){
            var query = {};
            if(username){
                query.user = username;
            }

            collection.find(query,{limit:9}).sort({time:-1}).toArray(function(err,docs){
                mongodb.close();

                if(err){
                    callback(err,null);
                }

                var posts = [];
                docs.forEach(function(doc, index){
                    var post = new Post(doc.user, doc.post, doc.time)
                    posts.push(post);
                })

                callback(null, posts);
            });
        });
    });
}
**/