
var User = require('../models/user.js');

/**
 * home page
 * @param req
 * @param res
 */
exports.index = function(req, res){

    User.top5(function(err,users){

        if(err){
            res.redirect('/error');
        }else{
            res.render('index', {
                title: '@发现',
                user:req.user,
                users:users,
                currentLink: 'HOME',
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            });
        }
    });

};
