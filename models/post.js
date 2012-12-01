



var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongodb = require('./mongolab-db');
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


//Post's comments
var Comment  = new Schema({
    title: {type: String, index: true},
    replyDate:  { type: Date, default: Date.now },
    content: String,
    rank:{type: Number, default: 0},
    creator: {type: Schema.ObjectId, ref: 'User'}
});

var PostSchema = mongoose.Schema({

    title: String,
    content: 'String',
    comments: [Comment],
    pusTime: { type: Date, default: Date.now },
    rank:{type: Number, default: 0},
    meta: {
          votes : Number
        , favs  : Number
    },
    creator: {type: Schema.ObjectId, ref: 'User'}
});

PostSchema.methods.findCreator = function(callback){
    return this.db.model('User','UserSchema').findById(this.creator,callback);
};
PostSchema.statics.findBytitle = function(title,callback){
    return this.find({title: title},callback);
};

PostSchema.statics.findCreatorPost = function(userId,callback){
    return this.find({creator: userId},callback);
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

Post.truncate = function(posts){
    var end = 200;
    _.each(posts,function(post){
        var content = post.content;
        post.content = _(content).truncate(end);
    });

    return posts;
}

/**
 * after fetch posts. do some operation on the original data
 * @param posts
 * @return {*}
 */
Post.dealPosts = function(posts){
    posts = Post.formatDate(posts);
    posts = Post.obtainUserSmallFace(posts);
    posts = Post.truncate(posts);
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