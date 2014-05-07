/**
 * detail routes
 */

exports.createRoutes = function(app){
    

    var application = require('../app/controllers/application_controller')
        home = require('../app/controllers/index_controller')
        posts = require('../app/controllers/posts_controller'),
        user = require('../app/controllers/users_controller'),
        chat = require('../app/controllers/chat_controller'),
        review = require('../app/controllers/reviews_controller'),
        uploader = require('../app/controllers/uploader_controller'),
        tags = require('../app/controllers/tags_controller');


    //set global settings
    app.all('*',user.loadUser);

    //home
    app.get('/',home.index);

    //chat
    app.get('/chat', chat.index);

    //posts
    app.delete('/posts',posts.destroy);
    app.get('/posts',posts.index);
    app.get('/posts/new',posts.new);
    app.post('/posts',posts.create);
    app.put('/posts',posts.retry);
    app.get('/posts/:id', posts.show);
    app.put('/posts/:id',posts.up);
    app.post('/comment',posts.comment);


    app.get('/reg', user.reg);
    app.post('/reg', user.doReg);

    app.post('/login', user.doLogin);
    app.get('/login', user.login);
    app.get('/logout', user.logout);
    app.get('/forgot', user.forgot);
    //app.get('/forgot/:id', user.forgotId);
    app.post('/forgot', user.doForgot);
    //app.post('/change', user.change);

    //user
    app.get('/users/edit',user.edit);
    app.get('/users/:userId', user.index);
    app.get('/users/:userId/:currentPage', user.index);
    app.get('/users',user.show);
    app.post('/users',user.updateProfile);
    app.put('/users',user.update);
    app.post('/users/face',user.updateFace);

    //review post
    app.get('/review',review.index);
    app.post('/review',review.do);

    //tag management
    app.all('/tags*',user.checkAdmin);
    app.get('/tags',tags.index);
    app.get('/tags/new',tags.new);
    app.get('/tags/:id/edit',tags.edit);
    app.put('/tags',tags.doEdit);
    app.post('/tags',tags.create);
    app.delete('/tags',tags.destroy);


}
