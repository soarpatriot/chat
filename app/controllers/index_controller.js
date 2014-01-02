

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
        result.users = users
    };

    var renderResult = function(){
        console.log(result.posts);
        res.render('index', {
            title: '@_@ 发现',
            user:req.user,
            users:result.users,
            posts:result.posts,
            currentLink: 'HOME',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    };

    var setTop10 = function(posts){
        result.posts = posts;
    };
    //var allPromise = Q.all([ fs_readFile('file1.txt'), fs_readFile('file2.txt') ]);
    //var topDenodify = Q.denodify(User.top5);
    //var top5Promise = User.top5();
    var from = moment().subtract('days', 7);
    var top10PostPromise = Post.find().sort('-score').where('pusTime').gt(from).skip(0).limit(10).exec()
        .then(setTop10);
    var promise = User.find().sort('-pubTime').limit(5).exec()
        .then(setTop5);

    var allPromise = Q.all([ top10PostPromise, promise ]);

    return allPromise.then(renderResult, showError);





    /**
    User.top5(function(err,users){

        if(err){
            res.redirect('/error');
        }else{

        }
    });**/

};
