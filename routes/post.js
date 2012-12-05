
/*
 * GET Post
 */

var Post = require('../models/post.js'),
    utils = require('../models/utils');

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


exports.up = function(req,res){
    var currentUser = req.session.user;
    var content =  req.body.content;
};


exports.all = function(req,res){
    var post = new Post();

    post.top5(function(err, posts){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

        var formattedPosts = Post.dealPosts(posts);
        var copyPosts = JSON.stringify(formattedPosts);
        //res.render('posts',{copyPosts});
        //res.setHeader()
        //res.contentType('json');//返回的数据类型
        res.send(copyPosts);//给客户端返回一个json格式的数据
        // res.end();


        res.format({
            html: function(){
                res.render('index', {
                    title: '翱翔中国',
                    posts: formattedPosts,
                    copyPosts: copyPosts,
                    user : req.session.user,
                    currentLink: 'HOME',
                    success : req.flash('success').toString(),
                    error : req.flash('error').toString()
                });
            },

            text: function(){
                res.json(copyPosts);
            },

            json: function(){
                res.json(copyPosts);
            }
        });

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
