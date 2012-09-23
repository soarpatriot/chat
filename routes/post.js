
/*
 * GET home page.
 */

var Post = require('../models/post.js');


exports.index = function(req, res){
    res.render('post', {
        title: 'Say',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};
exports.publish = function(req, res){
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


    var post = new Post({
        username: currentUser.name,
        content: content
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

