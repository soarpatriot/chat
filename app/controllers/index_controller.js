
var User = require('../models/user.js');
var logger = require('../../log4js').logger('index_controller');
/**
 * home page
 * @param req
 * @param res
 */
exports.index = function(req, res){

    User.top5(function(err,users){
        logger.info("request user from ip: ["+req.ip + "]   and ips :"+ "["+req.ips+"]");
        if(err){
            res.redirect('/error');
        }else{
            res.render('index', {
                title: '@_@ 发现',
                user:req.user,
                users:users,
                currentLink: 'HOME',
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            });
        }
    });

};
