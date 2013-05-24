

/**
 * home page
 * @param req
 * @param res
 */
exports.index = function(req, res){

    res.render('index', {
        title: '@中国',
        user:req.user,
        currentLink: 'HOME',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });

};
