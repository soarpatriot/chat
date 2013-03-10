/**
 * detail routes
 */

exports.createRoutes = function(app){

    var home = require('../controllers/index_controller')
        post = require('../controllers/posts_controller'),
        user = require('../controllers/users_controller'),
        chat = require('../controllers/chat_controller'),
        review = require('../controllers/reviews_controller'),
        uploader = require('../controllers/uploader_controller');



    app.get('/',user.loadUser, home.index);

    app.get('/chat', chat.index);

    app.all('/post*',user.loadUser)
    app.get('/post',post.new);
    app.post('/post',post.publish);
    app.get('/post/:id', post.get);

    app.all('/posts*',user.loadUser)
    app.get('/posts',post.all);

    app.get('/posts/review',post.review);
    app.get('/posts/:id',post.one);
    app.post('/posts',post.up);
    app.put('/posts/:id',post.up);


    app.post('/comment',user.loadUser,post.comment);


    app.get('/reg', user.reg);
    app.post('/reg', user.doReg);

    app.post('/login', user.doLogin);
    app.get('/login', user.login);
    app.get('/logout', user.logout);

    app.all('/user*',user.loadUser);
    app.get('/user/edit',user.edit);
    app.get('/user/:userId', user.index);
    app.get('/user',user.show);
    app.post('/user',user.updateProfile);
    app.put('/users',user.update);

    app.post('/upload-face',user.loadUser,uploader.uploadFace);
    app.get('/file-picker',uploader.filePicker);

    //review post
    app.get('/review',user.loadUser,review.index);
}
