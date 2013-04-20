require.config({

    baseUrl: "/javascripts",
    waitSeconds:10,

    //some special settings. like exports and dep
    shim: {



        "underscore": {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'bootstrap':{
            deps: ['jquery']
        }
    },

    paths: {
        //application own js module
        "application":"app/application",
        "home":"app/home",
        "models":"app/models",
        "review":"app/review",
        "user":"app/user",


        //js framework
        "underscore": "underscore",
        "backbone": "backbone",
        "bootstrap":"bootstrap.min",
        "Spinner": "spin.min",
        jquery: [

            //If the CDN location fails, load from this location
            'jquery-1.9.1.min'
        ]
    }

});