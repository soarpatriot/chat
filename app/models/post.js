/**
 * post model
 * @type {*}
 */
var mongoose = require('mongoose'),
    md = require('github-flavored-markdown').parse,
    utils = require('../helpers/utils'),
    Schema = mongoose.Schema;

var cloudinary = require('./cloudinary.js');

//var redis  = require('../models/redis');
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
var CommentSchema  = new Schema({
    title: {type: String, index: true,default: '无标题'},
    replyDate:  { type: Date, default: Date.now },
    content: String,
    rank:{type: Number, default: 0},
    creator: {type: Schema.ObjectId, ref: 'User'}
},schemaOptions);

//virtual properties
var commentFromNow = CommentSchema.virtual('fromNow');
commentFromNow.get(function(){
    return moment(this.replyDate).fromNow();
});



var Review = new Schema({
    agree:{type:Boolean,default: false},            // the number of this post  can publish or can not publish
    reason:{type:String},
    reviewer: {type: Schema.ObjectId, ref: 'User'}
},schemaOptions);

var PostSchema = mongoose.Schema({

    title: String,
    content: 'String',
    comments: [CommentSchema],
    pusTime: { type: Date, default: Date.now },

    rank:{type: Number, default: 0},
    score:{type: Number, default: 0},
    up:{type:Number,default: 0},                //the number of this post is up or down
    down:{type:Number,default: 0},
    done:{type:Boolean,default:false},          // adjust if current person operate up or down in this post.

    looked:{type:Number,default: 0},            // the number of being looked

    passed:{type:Boolean},       // when post passed === true, user can see the post  10 points passed

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

PostSchema.statics.findCreatorPost = function(userId,start,pageSize,callback){
    return this.find({creator: userId}).skip(start).limit(pageSize).exec(callback);
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

/**
 * query one post for review
 * @param callback
 * @return {*}
 */
PostSchema.statics.findPostForReview = function(callback){
    return this.findOne().where('passed').equals(null)
        .sort('+pusTime')
        .exec(callback);
};

//virtual properties
var fromNow = PostSchema.virtual('fromNow');
fromNow.get(function(){
        return moment(this.pusTime).fromNow();
    });



//comment
CommentSchema.statics.commentsByPostId = function(postId,callback){
    return this.find({}).where('creator').equals(postId)
        .where('score').gt(-10)
        .sort('-pusTime')
        .skip(startRowNumber)
        .exec(callback);
};


PostSchema.statics.populateCommentsCreatorByPostId = function(postId,callback){
    return this
                .findOne({'_id':postId})
                .populate('creator')
                .populate('comments.creator')
                .exec(callback);
};

var Post = mongoose.model('Post', PostSchema);
var Comment = mongoose.model('Comment', CommentSchema);

Post.top = function(start,size,callback){
    return Post.find().where('passed').equals(true)
        .where('score').gte(-10)
        .skip(start)
        .limit(size)
        .sort('-pusTime')
        .populate('creator')
        .exec(callback);
};

Post.countTop = function(callback){
    return Post.count().where('passed').equals(true)
        .where('score').gte(-10)
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

