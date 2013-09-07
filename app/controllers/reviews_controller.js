/**
 * review the post
 * @type {*}
 */

var Post = require('../models/post.js'),
    utils = require('../models/utils');

var User = require('../models/user.js');


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

    var error = req.flash('error').toString();

    Post.findPostForReview(function(err,post){
        if(err){
            res.render('review/show', {
                title: '审阅',
                currentLink: 'REVIEW',
                user:req.user,
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            });
        }else{

            if(_.isEmpty(post)){
                post = new Post({
                    title: '无需要审阅的内容',
                    content: '赶快发布自己的。。。。'
                });
                error = '暂无需要审阅的文章！'
            }else{

            }
            res.render('review/show', {
                title: '审阅',
                currentLink: 'REVIEW',
                user:req.user,
                post:post,
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            });
        }
    });

};


/**
 * find post for user review
 */
exports.do = function(req,res){

    var postId = req.body.postId;
    var passed = req.body.passed;

    if(passed ==='false'){
        passed = false;
    }else{
        passed = true;
    }

    Post.findOne({'_id':postId},function(err,post){
        if(err){
            req.flash('error','sorry, 查找文章出现错误！ ');
            return res.redirect('/review');
        }else{
            if(_.isEmpty(post)){
                req.flash('error','找不到此文章！ ');
                return res.redirect('/review');
            }else{

                Post.update({ _id: postId }, { passed: passed }, { multi: true }, function (err, numberAffected, raw) {
                    console.log('The number of updated documents was %d', numberAffected);
                    console.log('The raw response from Mongo was ', raw);
                    if (err){
                        req.flash('error','审察错误！ ');
                        res.redirect('/review');
                    }else{
                        req.flash('success','审察成功！ ');
                        res.redirect('/review');
                    }
                    //console.log('The number of updated documents was %d', numberAffected);
                    //console.log('The raw response from Mongo was ', raw);
                });

            }
        }
    });

};

