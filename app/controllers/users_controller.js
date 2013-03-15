
/*
 * User controller
 */

var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/**
 * redirect to user blog page
 * @param req
 * @param res
 */
exports.index = function(req,res){

    User.findOne({'_id':req.params.userId}, function(err,user){
        if(!user){
            req.flash('error','用户不存在！');
            return res.redirect('/');
        }

        Post.findCreatorPost(user._id, function(err,posts){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }

            posts = Post.dealPosts(posts);

            res.render('user/user-blogs',{
                title: user.name,
                posts: posts,
                user:  user,
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            })
        });
    });

}

/**
 * nav to register page
 * @param req
 * @param res
 */
exports.reg = function(req, res){

    res.render('user/reg',{
        title: 'Register',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });

}

/**
 * do the register function
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.doReg = function(req, res){

    if(req.body['password-repeat'] != req.body['password']){
        req.flash('error','两次输入密码不一致');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,

        password: password,
        email: req.body.email
    });

    User.findOne({'name': newUser.name}, function(err, user){
        //throw new Error('something broke!');
        if(err){
            if(err){
                req.flash('error',err);
                console.log(err);
                return res.redirect('/reg');
            }
        }

        if(user){
            err = '用户名已经存在,请更换其它用户名...';
            req.flash('error',err);
            console.log(err);
            return res.redirect('/reg');
        }else{

            newUser.save(function(err){
                if(err){
                    req.flash('error',err);
                    console.log(err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;
                req.flash('success','注册成功');
                return res.redirect('/');
            });
        }

    });
}

/**
 * nav to log page
 * @param req
 * @param res
 */
exports.login = function(req, res){
    res.render('users/login',{
        title: '用户登录',
        username: req.flash('username'),
        password: req.flash('password'),
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

/**
 * user login check
 * @param req
 * @param res
 */
exports.doLogin = function(req,res){

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var valid = true;
    User.findOne({'name': req.body.username}, function(err, user){

        if(!user){
            valid = false;
        }else if(user.password !== password){
            valid = false;
        }

        if(valid === false){
            req.flash('error','用户不存在,或用户名密码错误');
            req.flash('username',req.body.username);
            req.flash('password',req.body.password);
            return res.redirect('/login');
        }

        //req.session.user = user;
        req.session.userId = user._id;

        if(req.session.lastUrl!== null){
            req.flash('success','登录成功,请继续您的操作...');
        }
        req.flash('currentLink','HOME');

        return res.redirect('/');

    });
}

/**
 * user logout
 * @param req
 * @param res
 */
exports.logout = function(req, res){

    req.session.userId = null;
    req.flash('success','登出成功！');
    res.redirect('/');
}

/**
 * user profile show and edit
 * @param req
 * @param res
 */
exports.show = function(req,res){

    res.render('user/show',{
        title: '用户资料',
        user: req.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

/**
 * to user edit page
 * @param req
 * @param res
 */
exports.edit = function(req, res){

    var  _id = req.user._id;
    User.findOne({'_id': _id}, function(err, user){
        if(err){

            req.flash('error',err);
            console.log(err);
            return res.redirect('user/show');

        }else{

            res.render('user/edit',{
                title: '编辑',
                user: user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });
}


/**
 * user update profile
 * @param req
 * @param res
 */
exports.updateProfile = function(req,res){

    var user = req.user;
    var username = user.name;
    var faceUrl = req.body.faceUrl;
    var faceId = req.body.faceId;

    console.log('username: '+ username + '  faceId:  ' +faceId);
    User.update({ name: username }, { faceId: faceId }, { multi: true }, function (err, numberAffected, raw) {
        console.log('The number of updated documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
        if (err) {
            return handleError(err);
        }else{

            res.redirect('/');
        }
    });
}

exports.update = function(req,res){
    var user = req.user;
    var upNumber = req.body.up;
    var downNumber = req.body.down;

    if(!_.isNull(user) && !_.isUndefined(user)){
        User.findOne({'_id':user._id}, function(err,user){
            var favor = false;
            if(!_.isNull(upNumber) && !_.isUndefined(upNumber)){

                favor = true;
            }
            console.log("upNumber: "+upNumber);
            console.log("favor: "+favor);
            user.votePosts.push({ postId: postId,favor: favor});
            user.save(function(err){
                if(err){
                    console.log('error'+err);
                }
            });
        });
    }
}

/**
 * load user to pages
 * @param req
 * @param res
 * @param next
 */
exports.loadUser = function(req, res, next) {
    // You would fetch your user from the db
    var userId = req.session.userId;
    if(!_.isNull(userId) && !_.isUndefined(userId)){
        User.findOne({'_id': userId}, function(err, user){
            if(err){
                req.flash('error',err);
                console.log(err);
                return res.redirect('/');
            }else{
                req.user = user;
            }
            next();
        });
    }else{
        next();
    }
}
/**
exports.saveProfile = function(req, res){
    // 获得文件的临时路径
    var tmp_path = req.files.face.path;
    var extName = path.extname(req.files.face.name);
    // 指定文件上传后的目录 - 示例为"images"目录。
    // + req.files.face.name;
    var target_path =  __dirname + '/../public/images/face/'+path.basename(tmp_path) + extName;



    fs.readFile(tmp_path, function (err, data) {
        if (err) {
            res.send(err);
            return;
        }
        console.log('1213');
        fs.writeFile(target_path, data, function (err) {
            if (!err) {
                res.send({uploaded: true});
            } else {
                res.send(err);
            }
        });
    });



}
**/
/**
 // 移动文件
 fs.rename(tmp_path, target_path, function(err) {

        console.log('123123');
        if (err) throw err;

    // 删除临时文件夹文件,
        fs.unlink(tmp_path, function() {
            console.log('456');
            if (err) throw err;
            //res.send('File uploaded to: ' + target_path + ' - ' + req.files.face.size + ' bytes');
            res.render('user/edit',{
                title: '编辑',
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });
 **/
