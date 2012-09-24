
/*
 * GET home page.
 */

/**
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://soarpatriot:22143521@ds037837-a.mongolab.com:37837/xiaodonggua');
var schema = mongoose.Schema({ name: 'string' });
var Cat = db.model('Cat', schema);
var kitty = new Cat({ name: 'Zildjian' });
**/
/**
var Cat = require('../models/cat')

exports.index = function(req, res){
    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save(function (err) {
        console.log('ssssss');
        if (err) {
            console.log(err);
        }else{
            res.render('index', {
                title: '江湖',
                user : req.session.user,
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            });
        }
    });
};
 **/
var Post = require('../models/post.js');

exports.index = function(req, res){

    Post.find({}, function(err,posts){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('index', {
            title: '江湖',
            posts: posts,
            user : req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    }).limit(10).sort({'pusTime':'desc'});

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

