
/*
 * GET Post
 */

var Post = require('../models/post.js'),
    md = require('github-flavored-markdown').parse,
    utils = require('../models/utils');

var User = require('../models/user.js');
//var client = require('../models/redis.js')

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

/**
 * redirect to post page
 * @param req
 * @param res
 */
exports.new = function(req, res){
    res.render('post/new', {
        title: '发表',
        user : req.user,
        currentLink: 'MICRO',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};

/**
 * publish a post
 * @param req
 * @param res
 * @return {*}
 */
exports.publish = function(req, res){
    var currentUser = req.user;
    var content =  req.body.content;
    var title = req.body.title;
    if(currentUser === null){
        req.flash('error','请先登录！ ');
        return res.redirect('/post');
    }

    if( content === null ||  content===''){
        req.flash('error','发言内容不能为！ ');
        return res.redirect('/post');
    }

    console.log('user ObjectId:  '+currentUser._id);
    var post = new Post({
        username: currentUser.name,
        content: content,
        title: title,
        creator:currentUser._id
    });


    post.save(function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('/post');
        }else{
            req.flash('success','发表成功！');
            res.redirect('/user/'+currentUser._id);
        }
    });


}

/**
 * publish a comment
 * @param req
 * @param res
 * @return {*}
 */
exports.comment = function(req,res){
    var postId = req.body.postId;
    var currentUser = req.user;
    var content =  req.body.content;

    console.log('current user'+currentUser);
    if(utils.isObjEmpty(currentUser)){
        req.flash('error','请先登录！ ');
        return res.redirect('/post/'+postId);
    }

    if(utils.isEmpty(content)){
        req.flash('error','发言内容不能为！ ');
        return res.redirect('/post/'+postId);
    }

    Post.findOne({'_id':postId}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/post/'+postId);
        }

        post.comments.push({ content: content,creator: currentUser._id});
        post.save(function(err){
            if(err){
                req.flash('error',err);
            }else{
                req.flash('success','发表成功！');
                return res.redirect('/post/'+postId);
            }
        });
    });
}

/**
 * view post
 * @param req
 * @param res
 */
exports.get = function(req,res){

    var postId = req.params.id;
    Post.populateCommentsCreatorByPostId(postId, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

        /***
        Post.findCommentsByPostId(post._id,function(err,comments){
            console.log("comment: "+JSON.stringify(comments));
        });**/


        post = Post.markdownComment(post)
        var html = md(post.content);
        html = html.replace(/\{([^}]+)\}/g, function(_, name){
            return options[name] || '';
        })


        post.content = html;
        //update the number of being looked
        var lookedNumber = post.get("looked")+1;
        post.update({ looked:lookedNumber}, { multi: true }, function (err, numberAffected, raw) {

        });

        res.render('post/blog-one',{
            title: post.username,
            post: post,
            user: req.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })
    });
}

/**
 * find post for user review
 */
exports.review = function(req,res){


    //Post.countPostForReview(function(err,number){
    Post.findPostForReview(function(err,post){
        if(err){

            res.send(err);
        }else{

            res.json(post);
            console.log("viewed post start:"+post);
        }
    });

    //});
};



/**
 * backbone used, home page top5 posts
 * @param req
 * @param res
 */
exports.all = function(req,res){

    var user = req.user;

    Post.top5(function(err, posts){

        if(err){
            res.send(err);
        }

        var formattedPosts = Post.dealPosts(posts);
        console.log("posts:"+posts.length);
        if(_.isNull(user) || _.isUndefined(user)){

            formattedPosts = Post.doDone(posts);
            res.send(formattedPosts);

        }else{
            //done and undone user's up and down
            User.findOne({'_id':user._id}, function(err,user){
                var votes = user.votePosts;
                _.each(votes,function(vote){

                    _.each(posts,function(post){

                        if(_.isEqual(vote.postId ,post._id)){

                            post.done = true;
                        }
                    });
                });
                res.send(formattedPosts);
            });

        }

    });
};

/**
 * get one post for backbone
 * @param req
 * @param res
 */
exports.one = function(req,res){
    Post.findPostWithCreator(req.params.id, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        console.log("post one");
        //res.contentType('json');//返回的数据类型
        //res.send(post);//给客户端返回一个json格式的数据
        post = Post.truncateOne(post);
        res.format({
            html: function(){
                //res.json(post);
            },

            text: function(){
                //res.json(post);
            },

            json: function(){
                res.json(post);
            }
        });
    });
}

/**
 * user up and down a post
 * only login user can up and down a post
 *
 * @param req
 * @param res
 */
exports.up = function(req,res){

    var postId = req.body._id;
    var passed = req.body.passed;

    Post.findPostWithCreator(postId, function(err,post){
        if(err){
            req.flash('error', err.toString());
            return res.redirect('/');
        }
        post.update({ passed: passed}, { multi: true }, function (err, numberAffected, raw) {

            if (err) {
                return handleError(err);
            }else{
                //console.log(raw);
                res.format({
                    html: function(){
                        //res.json(post);
                    },

                    text: function(){
                        //res.json(post);
                    },

                    json: function(){
                        console.log("update:"+numberAffected);
                        console.log("raw:"+JSON.stringify(raw));
                        //res.json(post);
                    }
                });
            }
        });

    });
}