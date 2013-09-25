/**
 * posts controller
 * @author Soar
 *
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
    res.render('posts/new', {
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
exports.create = function(req, res){
    var currentUser = req.user;
    var content =  req.body.content;
    var title = req.body.title;
    if(currentUser === null){
        req.flash('error','请先登录！ ');
        return res.redirect('/login');
    }

    if( !content || !title ){
        req.flash('error','发言内容不能为空！ ');
        return res.redirect('/posts/new');
    }

    var post = new Post({
        username: currentUser.name,
        content: content,
        title: title,
        creator:currentUser._id
    });

    post.save(function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('/posts/new');
        }else{
            req.flash('success','发表成功待审核！');
            res.redirect('/users/'+currentUser._id);
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
        return res.redirect('/posts/'+postId);
    }

    if(utils.isEmpty(content)){
        req.flash('error','发言内容不能为！ ');
        return res.redirect('/posts/'+postId);
    }

    Post.findOne({'_id':postId}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/posts/'+postId);
        }

        post.comments.push({ content: content,creator: currentUser._id});
        post.save(function(err){
            if(err){
                req.flash('error',err);
            }else{
                req.flash('success','发表成功！');
                return res.redirect('/posts/'+postId);
            }
        });
    });
}

/**
 * view one post by id
 * @param req
 * @param res
 */
exports.show = function(req,res){

    var postId = req.params.id;
    Post.populateCommentsCreatorByPostId(postId, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

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

        res.render('posts/show',{
            title: post.title,
            post: post,
            user: req.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })
    });
}



/**
 * backbone used, home page top5 posts
 * @param req
 * @param res
 */
exports.index = function(req,res){

    var user = req.user;
    var page = {};
    var state = {
        totalRecords:0,
        currentPage:1
    }
    var pageSize = req.query.pageSize;
    state.currentPage = req.query.page;
    var start = (state.currentPage - 1) * pageSize;

    Post.countTop(function(err,totalCount){

        Post.top(start,pageSize,function(err, posts){
            
            if(err){
                res.send(err);
            }
            formattedPosts = Post.dealPosts(posts);
            state.totalRecords = totalCount;
            page.state = state;

            if(!user){
                formattedPosts = Post.doDone(posts);
                page.models = formattedPosts;
                //console.log('formattedPosts:  page: '+JSON.stringify(page));
                return res.send(page);

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
                    
                    page.models = formattedPosts;
                    return res.send(page);
                });

            }

        });
    });

};

exports.destroy = function(req,res){

    var user = req.user;

    Post.remove({ _id: req.body.postId }, function (err) {
        if (err) {
            req.flash('error', '删除失败！');
            return handleError(err);
        }else{
            req.flash('success', '删除成功！');
            res.redirect('/users/'+user._id+'/'+req.body.currentPage);
        }
    });
}


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

    var up = req.body.up;
    var down = req.body.down;
    var postId = req.body._id;
    var user = req.user;

    Post.findOne({ _id: postId },function(err,post){
        if(err){
            console.log('find post error in up and down');
        }else{
            if(!_.isNull(up) && !_.isUndefined(up)){
                post.up = up;
                post.score =  post.down + post.up;
            }
            if(!_.isNull(down) && !_.isUndefined(down)){
                post.down = down;
                post.score =  post.down + post.up;
            }
            post.save(function(err){

                if(err){
                    console.log('save uped and downed post error in up and down');
                }else{

                    User.findOne({'_id':user._id}, function(err,user){
                        if(err){
                            console.log('user find error in up and down');
                        }else{
                            var favor = false;
                            if(!_.isNull(up) && !_.isUndefined(up)){
                                favor = true;
                            }

                            user.votePosts.push({ postId: postId, favor:favor});
                            user.save(function(err){
                                if(err){
                                    console.log('save uped and downed user info  error in up and down');
                                }else{
                                    res.send("success!");
                                }
                            });
                        }
                    });
                    res.send("success!");
                }
            });
        }

    });
}