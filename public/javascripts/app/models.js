/**
 * This file is used for collect all the client models of projcect
 * @author  Soar
 *
 */
define(["backbone"],function(Backbone) {

    return {
        User : Backbone.Model.extend({
            idAttribute: "_id",
            urlRoot : '/users'
        }),

        Post : Backbone.Model.extend({
            idAttribute: "_id",
            urlRoot : '/posts',
            creator: this.User
        }),

        PostList : Backbone.Collection.extend({
            Model:this.Post,
            url: '/posts'
        }),

        Review : Backbone.Model.extend({
            agree:false,
            reason:''
        })
    }

});

