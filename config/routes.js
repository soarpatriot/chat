/**
 * detail routes
 */

exports.createRoutes = function(app){

    var home = require('../app/controllers/index_controller')
        posts = require('../app/controllers/posts_controller'),
        user = require('../app/controllers/users_controller'),
        chat = require('../app/controllers/chat_controller'),
        review = require('../app/controllers/reviews_controller'),
        uploader = require('../app/controllers/uploader_controller')
        tags = require('../app/controllers/tags_controller');;



    app.get('/',user.loadUser, home.index);

    app.get('/chat', chat.index);

    app.all('/posts*',user.loadUser);
    app.delete('/posts',posts.destroy);
    app.get('/posts',posts.index);
    app.get('/posts/new',posts.new);
    app.post('/posts',posts.create);

    //app.get('/posts/review',posts.review);
    app.get('/posts/:id', posts.show);


    app.get('/posts/:id',posts.one);
    app.put('/posts/:id',posts.up);

    app.post('/comment',user.loadUser,posts.comment);


    app.get('/reg', user.reg);
    app.post('/reg', user.doReg);

    app.post('/login', user.doLogin);
    app.get('/login', user.login);
    app.get('/logout', user.logout);

    app.all('/users*',user.loadUser);
    app.get('/users/edit',user.edit);
    app.get('/users/:userId', user.index);
    app.get('/users/:userId/:currentPage', user.index);
    app.get('/users',user.show);
    app.post('/users',user.updateProfile);
    app.put('/users',user.update);

    app.post('/upload',user.loadUser,uploader.face);
    app.post('/upload-face',user.loadUser,uploader.uploadFace);
    app.get('/file-picker',uploader.filePicker);

    //review post
    app.get('/review',user.loadUser,review.index);
    app.post('/review',user.loadUser,review.do);

    //tag management
    app.all('/tags*',user.checkAdmin);
    app.get('/tags',user.loadUser,tags.index);
    app.get('/tags/new',user.loadUser,tags.new);
    app.get('/tags/:id/edit',user.loadUser,tags.edit);
    app.put('/tags',user.loadUser,tags.doEdit);
    app.post('/tags',user.loadUser,tags.create);
    app.delete('/tags',user.loadUser,tags.destroy);


}
