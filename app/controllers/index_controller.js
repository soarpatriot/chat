

var Q = require("q");
var User = require('../models/user.js');
var Post = require('../models/post.js');
var logger = require('../../log4js').logger('index_controller');
var moment = require('moment');
/**
 * home page
 * @param req
 * @param res
 */
exports.index = function(req, res){


    logger.info("request user from ip: ["+req.ip + "]   and ips :"+ "["+req.ips+"]");

    var result={};

    var showError = function(err){
        if(err){
            res.redirect('/error');
        }
    };

    var setTop5 = function(users){
        console.log("user:"+users.length);
        result.users = users
    };

    var renderResult = function(){
        res.render('index', {
            title: '@_@ 发现',
            user:req.user,
            users:result.users,
            topPosts:result.posts,
            currentLink: 'HOME',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    };

    var setTop10 = function(posts){
        result.posts = posts;
    };

    var from = moment().subtract('days', 30);
    var top10PostPromise = Post.find().where('passed').equals(true)
                            .where('pusTime').gt(from)
                            .sort('-score')
                            .skip(0).limit(10).exec()
                            .then(setTop10);

    var promise = User.find().sort('-regTime').limit(10).exec()
        .then(setTop5);

    var allPromise = Q.all([ top10PostPromise, promise ]);

    return allPromise.then(renderResult, showError);

};
