
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user.js');

exports.index = function(req, res){
  res.render('index', { title: 'Chat' });
};

exports.reg = function(req, res){
  res.render('reg',{
      title: 'Register',
      user : req.session.user,
      //success: req.flash('success').toString(),
      //error: req.flash('error').toString()
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
          //req.flash('error', err);
          console.log(err);
          return res.redirect('/reg');
      }

      newUser.save(function(err){
          if(err){
              //req.flash('error',err);
              console.log(err);
              return res.redirect('/reg');
          }
          req.session.user = newUser;
          //req.flash('success','注册成功');
          res.redirect('/');
      })
  })
}