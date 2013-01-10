
/*
 * GET Home
 */

var Post = require('../models/post.js');

exports.index = function(req, res){

    res.render('index', {
        title: '翱翔中国',
        user:req.user,
        currentLink: 'HOME',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });

};



exports.checkLogin = function(req, res){

    var currentUser = req.session.user;
    if(currentUser === null){
        req.flash('error','请登录后发表微波！ ');
        req.session.lastUrl = req.url;

        console.log('last url '+req.session.lastUrl );
        return res.redirect('/login');
    }else{
        return req.next();
    }

}

