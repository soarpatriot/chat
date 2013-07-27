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
        },
        'bootstrap':{
            deps: ['jquery']
        }

    },

    paths: {

        "models":"app/models",

        //js framework
        "underscore": "underscore",
        "backbone": "backbone",
        "bootstrap":"bootstrap.min",

        "Spinner": "spin.min",
        "jquery": "jquery-1.9.1.min"

    }

});