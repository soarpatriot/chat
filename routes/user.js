
/*
 * User controller
 */


var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');


exports.index = function(req,res){
    User.findOne({'name':req.params.user}, function(err,user){
        if(!user){
            req.flush('error','用户不存在！');
            return req.redirect('/');
        }
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
        user : req.session.user,
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
        password: password
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
        req.flash('success','登录成功');

        if(req.session.lastUrl!== null){
            req.flash('success','登录成功,请继续您的操作...');
            //return res.redirect(req.session.lastUrl);
        }
        return res.redirect('/');

    })

}


exports.logout = function(req, res){
    req.session.user = null;
    req.flash('success','登出成功！');
    res.redirect('/');
}

/**
exports.index = function(req,res){
    User.get(req.params.user, function(err,user){
        if(!user){
            req.flush('error','用户不存在！');
            return req.redirect('/');
        }
        Post.get(user.name, function(err,posts){
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
    User.get(req.body.username, function(err, user){
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
        req.flash('success','登录成功');

        if(req.session.lastUrl!== null){
            req.flash('success','登录成功,请继续您的操作...');
            //return res.redirect(req.session.lastUrl);
        }
        return res.redirect('/');

    })

}

exports.logout = function(req, res){
    req.session.user = null;
    req.flash('success','登出成功！');
    res.redirect('/');
}
 **/