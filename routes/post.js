
/*
 * GET Post
 */

var Post = require('../models/post.js'),
    utils = require('../models/utils');



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





exports.index = function(req, res){
    res.render('post', {
        title: 'Say',
        user : req.session.user,
        currentLink: 'MICRO',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};
exports.publish = function(req, res){
    var currentUser = req.session.user;
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
            res.redirect('/u/'+currentUser.name);
        }
    });


}

exports.comment = function(req,res){
    var postId = req.body.postId;
    var currentUser = req.session.user;
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

exports.get = function(req,res){

    Post.findOne({'_id':req.params.id}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('blog-one',{
            title: post.username,
            post: post,
            user: req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })
    });
}




exports.all = function(req,res){
    var post = new Post();

    post.top5(function(err, posts){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

        /**
        var end =200;
        for(var i=0; i<posts.length; i++){
            posts[i].set('fromNow',moment(posts[i].pusTime).fromNow());

            posts[i].content = _(posts[i].content).truncate(end);

            posts[i].creator.faceUrl = cloudinary.genSmallFace(posts[i].creator.faceId);
            //console.log(posts[i]);

        }**/

        var formattedPosts = Post.dealPosts(posts);
        //var formattedPosts = Post.dealPosts(posts);
        //var copyPosts = JSON.stringify(formattedPosts);
        //res.render('posts',{copyPosts});
        //res.setHeader()
        //res.contentType('json');//返回的数据类型
        //console.log(posts);
        res.send(JSON.stringify(formattedPosts));//给客户端返回一个json格式的数据
        // res.end();

        /**
        res.format({
            html: function(){

            },

            text: function(){
                res.json(formattedPosts);
            },

            json: function(){
                res.json(formattedPosts);
            }
        });**/

    });
};

exports.one = function(req,res){
    Post.findOne({'_id':req.params.id}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        console.log('post:  '+post.toString());
        //res.contentType('json');//返回的数据类型
        //res.send(post);//给客户端返回一个json格式的数据

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

exports.up = function(req,res){



    console.log("sdfadfadfadfadf..........");
    Post.findOne({'_id':req.params.id}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

        var up = post.get("up")+1;

        post.update({ up: up }, { multi: true }, function (err, numberAffected, raw) {
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            if (err) {
                return handleError(err);
            }else{

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

            }

        });


    });
}