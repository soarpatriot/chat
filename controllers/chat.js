
/*
 * chat controller
 */

exports.index = function(req, res){
    res.render('chat', {
        title: 'Chat',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};