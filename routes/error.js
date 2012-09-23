/*
 *Error controller
 */

exports.index = function(req,res){
    res.render('error', {
        title: 'Error',

        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
}