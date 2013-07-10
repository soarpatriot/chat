/**
 * This file is used for collect all the client models of projcect
 * @author  Soar
 *
 */

require.config({

    baseUrl: "/javascripts",

    //some special settings. like exports and dep
    shim: {

        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        }

    },
    paths: {
        //js framework
        "underscore": "underscore",
        "backbone": "backbone",
        "jquery": "jquery-1.9.1.min"
    }

});


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

