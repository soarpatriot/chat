
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

exports.index = function(req, res){
  res.render('index', {
      title: '江湖',
      user : req.session.user,
      success : req.flash('success').toString(),
      error : req.flash('error').toString()
  });
};

exports.user = function(req,res){
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

exports.post = function(req, res){
    res.render('post', {
        title: 'Say',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};
exports.doPost = function(req, res){
    var currentUser = req.session.user;
    var content =  req.body.content;

    if(currentUser === null){
        req.flash('error','请先登录！ ');
        return res.redirect('/post');
    }

    if( content === null ||  content===''){
        req.flash('error','发言内容不能为！ ');
        return res.redirect('/post');
    }

    var post = new Post(currentUser.name, content);


    post.save(function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('/post');
        }else{
            req.flash('success','发表成功！');
            res.redirect('/u/'+currentUser.name);
        }
    });


}

exports.chat = function(req, res){
    res.render('chat', {
        title: 'Chat',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
};

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

  User.get(newUser.name, function(err, user){
      if(user){
          err = 'Username already exists.';
      }
      if(err){
          req.flash('error', err);
          console.log(err);
          return res.redirect('/reg');
      }

      newUser.save(function(err){
          if(err){
              req.flash('error',err);
              console.log(err);
              return res.redirect('/reg');
          }
          req.session.user = newUser;
          req.flash('success','注册成功');
          res.redirect('/');
      })
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
        console.log('login success');
        res.redirect('/');
    })

}

exports.logout = function(req, res){
    req.session.user = null;
    req.flash('success','登出成功！');
    res.redirect('/');
}