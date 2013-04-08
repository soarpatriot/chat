require.config({

    baseUrl: "/javascripts",
    waitSeconds:10,

    //some special settings. like exports and dep
    shim: {

        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
            //If the CDN location fails, load from this location
            'app/jquery-1.9.1.min'
        ],

        "underscore": {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    },

    paths: {
        //application own js module
        "home":"app/home",
        "models":"app/models",
        "review":"app/review",
        "user":"app/user",
        //js framework
        "underscore": "underscore",
        "backbone": "backbone"
    }

});