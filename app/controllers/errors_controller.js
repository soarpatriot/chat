/*
 *Error controller
 */

exports.index = function(err,req,res,next){
    res.render('error', {
        title: 'Error',

        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
}