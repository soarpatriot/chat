



var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongodb = require('./mongolab-db');
var cloudinary = require('../models/cloudinary.js');

var moment = require('moment');
moment.lang('zh-cn');


//Post's comments
var Comment  = new Schema();

Comment.add({
    title: {type: String, index: true},
    date: Date,
    body: String,
    comments:[Comment]
});

var PostSchema = mongoose.Schema({
    username: 'String',
    title: String,
    content: 'String',
    comments: [Comment],
    pusTime: { type: Date, default: Date.now },

    creator: {type: Schema.ObjectId, ref: 'User'}
});

PostSchema.methods.findCreator = function(callback){
    return this.db.model('User','UserSchema').findById(this.creator,callback);
};
PostSchema.statics.findBytitle = function(title,callback){
    return this.find({title: title},callback);
};
PostSchema.methods.expressiveQuery = function(creator, date, callback){
    return this.find('creator', creator).where('pusTime').gte(date).run(callback);
};


PostSchema.methods.formatDate = function(){
    this.fromNow = moment(this.pusTime).fromNow();

};

/**
PostSchema
    .virtual('author')
    .get(function(){
        if(null!==this.creator){
            User.findById(this.creator,function(err,user){
                if(null!== user.name ){
                    console.log('User inform: ' + user.name);
                }

                return user;
            });
        }
    })
    .set(function(){
        if(null!==this.creator){
            User.findById(this.creator,function(err,user){
                if(null!== user.name ){
                    console.log('User inform: ' + user.name);
                }

                return user;
            });
        }
    })

**/



var Post = mongodb.db.model('Post', PostSchema);


Post.prototype.top5 = function(callback){
    return Post.where()
        .limit(5)
        .sort('-pusTime')
        .populate('creator')
        .exec(callback);

};

/**
 * format the post pusTime to more readable
 * @param posts
 * @return {*}
 */
Post.formatDate = function(posts){
    for(var i=0; i<posts.length; i++){
        posts[i].fromNow = moment(posts[i].pusTime).fromNow();
        if(null!== posts[i].creator && 'undefined' !==  typeof(posts[i].creator)){
            console.log('post creator: '+ posts[i].creator.name);
        }

    }

    return posts;
};

/**
 * generate an face for very post's author
 * @param posts
 * @return {*}
 */
Post.obtainUserSmallFace = function(posts){
    for(var i=0; i<posts.length; i++){
        posts[i].creator.faceUrl = cloudinary.genSmallFace(posts[i].creator.faceId);
        if(null!== posts[i].creator && 'undefined' !==  typeof(posts[i].creator)){
            console.log('post creator faceUrl: '+ posts[i].creator.faceUrl);
        }

    }

    return posts;
}

Post.reduce = function(posts){
    for(var i=0; i<posts.length; i++){
        var content = posts[i].content;
        var end = 200;
        if(null!== content && '' !==  content && content.length > end){
            posts[i].content = content.substring(0, end);
        }
    }
}

/**
 * after fetch posts. do some operation on the original data
 * @param posts
 * @return {*}
 */
Post.dealPosts = function(posts){
    posts = Post.formatDate(posts);
    posts = Post.obtainUserSmallFace(posts);
    //posts = Post.reduce(posts);
    return posts;
}

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