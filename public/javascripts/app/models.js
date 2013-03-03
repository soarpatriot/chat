/**
 * This file is used for collect all the client models of projcect
 * @author  Soar
 *
 */

var User = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot : '/users'
});

var Post = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot : '/posts',
    creator: new User
});

var PostList = Backbone.Collection.extend({
    Model:Post,
    url: '/posts'
});

var Review = Backbone.Model.extend({
    agree:false,
    reason:''
});
