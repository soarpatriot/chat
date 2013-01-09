/**
 * post model
 * @type {*}
 */
var mongoose = require('mongoose'),
    md = require('github-flavored-markdown').parse,
    utils = require('../helpers/utils'),
    Schema = mongoose.Schema;
var mongodb = require('./mongolab-db');
var cloudinary = require('../models/cloudinary.js');

//Schema.set('toJSON', { virtuals: true });

var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

var moment = require('moment');
moment.lang('zh-cn');

// schema options include virtual properties
var schemaOptions = {
    toJSON: {
        virtuals: true
    }
};
//Post's comments
var Comment  = new Schema({
    title: {type: String, index: true,default: '无标题'},
    replyDate:  { type: Date, default: Date.now },
    content: String,
    rank:{type: Number, default: 0},
    creator: {type: Schema.ObjectId, ref: 'User'}
},schemaOptions);

var Review = new Schema({
    agree:{type:Boolean,default: false},            // the number of this post  can publish or can not publish
    reason:{type:String},
    reviewer: {type: Schema.ObjectId, ref: 'User'}
},schemaOptions);

var PostSchema = mongoose.Schema({

    title: String,
    content: 'String',
    comments: [Comment],
    pusTime: { type: Date, default: Date.now },

    rank:{type: Number, default: 0},
    up:{type:Number,default: 0},                //the number of this post is up or down
    down:{type:Number,default: 0},
    done:{type:Boolean,default:false},          // adjust if current person operate up or down in this post.

    looked:{type:Number,default: 0},            // the number of being looked

    passed:{type:Boolean, default:false},       // when post passed === true, user can see the post  10 points passed
    score:{type:Number,default: 0},             // the number of this post  can publish or can not publish
    beReviewed:[Review],

    creator: {type: Schema.ObjectId, ref: 'User'}

},schemaOptions);


//custom method
PostSchema.methods.findCreator = function(callback){
    return this.db.model('User','UserSchema').findById(this.creator,callback);
};

PostSchema.statics.findPostWithCreator = function(id,callback){
    return this.findOne({'_id': id},callback).populate('creator');
};

PostSchema.statics.findBytitle = function(title,callback){
    return this.find({title: title},callback);
};

PostSchema.statics.findCreatorPost = function(userId,callback){
    return this.find({creator: userId},callback);
};

//find one post for review
PostSchema.methods.findByRank = function(creator, date, callback){
    return this.findOne('creator', creator).where('passed').eq('false').run(callback);
};

PostSchema.statics.countPostForReview = function(callback){
    return this.where('passed').equals(false)
        .where('score').gt(-10)
        .sort('-pusTime')
        .count(callback);
};

PostSchema.statics.findPostForReview = function(startRowNumber,callback){
    return this.findOne().where('passed').equals(false)
        .where('score').gt(-10)
        .sort('-pusTime')
        .skip(startRowNumber)
        .exec(callback);
};

//virtual properties
var fromNow = PostSchema.virtual('fromNow');
fromNow.get(function(){
        return moment(this.pusTime).fromNow();
    });


var Post = mongodb.db.model('Post', PostSchema);

Post.top5 = function(callback){
    return Post.where('passed').equals(false)
        .limit(5)
        .sort('-pusTime')
        .populate('creator')
        .exec(callback);

};

/**
 * if the content length than a number, then truncate it.
 * @param posts
 * @return {*}
 */
Post.markdownComment = function(post){

    _.each(post.comments,function(comment){
        comment.content = md(comment.content);

    });
    return post;
}


/**
 * if the content length than a number, then truncate it.
 * @param posts
 * @return {*}
 */
Post.truncateAll = function(posts){
    var end = 200;
    _.each(posts,function(post){
        Post.truncateOne(post);
    });
    return posts;
}


/**
 * truncate one
 * if the content length than a number, then truncate it.
 * @param posts
 * @return {*}
 */
Post.truncateOne = function(post){
    var end = 200;
    var content = post.content;
    content = utils.delHtmlTag(content);
    post.content = _(content).truncate(end);
    return post;
};

/**
 * after fetch posts. do some operation on the original data
 * @param posts
 * @return {*}
 */
Post.dealPosts = function(posts){
    posts = Post.truncateAll(posts);
    return posts;
};


/**
 *
 * @param posts
 * @return {*}
 */
Post.doDone = function(posts){
    _.each(posts,function(post){
        post.done = true;

    });
    return posts;
}
Post.unDoDone = function(posts){
    _.each(posts,function(post){
        post.done = false;
    });
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