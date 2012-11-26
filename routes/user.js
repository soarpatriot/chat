
/*
 * User controller
 */


var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var cloudinary = require('../models/cloudinary.js');


exports.index = function(req,res){
    User.findOne({'name':req.params.user}, function(err,user){
        if(!user){
            req.flush('error','用户不存在！');
            return req.redirect('/');
        }
        console.log('User:'+user)
        Post.find({'username':user.name}, function(err,posts){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user-blogs',{
                title: user.name,
                posts: posts,
                user: req.session.user,
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            })
        });
    });
}

exports.reg = function(req, res){
    res.render('reg',{
        title: 'Register',

        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
}

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


    })
}


exports.login = function(req, res){
    res.render('login',{
        title: '用户登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
}


exports.doLogin = function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    console.log('login start');
    User.findOne({'name': req.body.username}, function(err, user){
        console.log('username: '+req.body.username);
        if(!user){
            req.flash('error','用户不存在');
            console.log('用户不存在');
            return res.redirect('/');

        }
        if(user.password !== password){
            req.flash('error','密码错误');
            console.log('密码错误');
            return res.redirect('/');
        }

        req.session.user = user;
        console.log('why??');
        if(req.session.lastUrl!== null){
            req.flash('success','登录成功,请继续您的操作...');
            //return res.redirect(req.session.lastUrl);
        }
        req.flash('currentLink','HOME');

        console.log('hear??');
        return res.redirect('/');

    });
}


exports.logout = function(req, res){
    req.session.user = null;
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

        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

exports.edit = function(req, res){

    var  _id = req.session.user._id;
    User.findOne({'_id': _id}, function(err, user){
        if(err){

            req.flash('error',err);
            console.log(err);
            return res.redirect('user/show');

        }else{

            user.faceUrl = cloudinary.genEditFace(user.faceId);
            console.log("edit:: \n"+user);
            res.render('user/edit',{
                title: '编辑',
                user: user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });
}

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

}

exports.updateProfile = function(req,res){

    var user = req.session.user;
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