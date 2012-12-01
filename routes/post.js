
/*
 * GET Post
 */

var Post = require('../models/post.js');


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

    if(currentUser === null){
        req.flash('error','请先登录！ ');
        return res.redirect('/post');
    }

    if( content === null ||  content===''){
        req.flash('error','发言内容不能为！ ');
        return res.redirect('/post');
    }

    Post.findOne({'_id':postId}, function(err,post){
        if(err){
            req.flash('error', err);
            return res.redirect('/post/'+postId);
        }
        console.log('post'+ post);

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