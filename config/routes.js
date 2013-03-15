/**
 * detail routes
 */

exports.createRoutes = function(app){

    var home = require('../app/controllers/index_controller')
        posts = require('../app/controllers/posts_controller'),
        user = require('../app/controllers/users_controller'),
        chat = require('../app/controllers/chat_controller'),
        review = require('../app/controllers/reviews_controller'),
        uploader = require('../app/controllers/uploader_controller');



    app.get('/',user.loadUser, home.index);

    app.get('/chat', chat.index);

    app.all('/posts*',user.loadUser);
    app.get('/posts',posts.index);
    app.get('/posts/new',posts.new);
    app.post('/posts',posts.create);
    app.get('/posts/review',posts.review);
    app.get('/posts/:id', posts.show);


    app.get('/posts/:id',posts.one);
    app.post('/posts',posts.up);
    app.put('/posts/:id',posts.up);
    app.post('/comment',user.loadUser,posts.comment);


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
