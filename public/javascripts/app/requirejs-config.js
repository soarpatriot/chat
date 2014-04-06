require.config({

    baseUrl: "/javascripts",
    waitSeconds:100,

    //some special settings. like exports and dep
    shim: {

        "underscore": {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        },
        'Showdown': {

            exports: 'Showdown'
        },
        'backbone-pageable': {
            deps: ['backbone']

        },
        'bootstrap':{
            deps: ['jquery']
        },
        'animo':{
            deps: ['jquery']
        },
        'google-html5':{
            exports: 'google-html5'
        },
        'chosen': {
            exports: 'chosen'
        }

    },

    paths: {
        //application own js module
        //"application":"app/application",
        //"home":"app/home",
        "models":"app/models",
        "review":"app/review",
        "user":"app/user",

        "user-blogs":"app/user-blogs",
        'area':'app/area',
        //js framework
        "underscore": "underscore",
        "backbone": "backbone",
        "backbone-pageable": "backbone-pageable.min",
        "bootstrap":"bootstrap.min",
        "bootstrapPaginator":"bootstrap-paginator.min",
        "animo":"animo",
        "jquery": "jquery-2.0.3.min",

        'Showdown':'showdown',
        'google-html5':'google-code-prettify/html5',
        'chosen':'chosen.jquery.min',
        /**
        jquery: [

            //If the CDN location fails, load from this location

        ],**/
        'jquery.spin': 'jquery.spin',
        'jqBootstrapValidation':'jqBootstrapValidation-1.3.7.min',

        'jquery.colorbox':'jquery.colorbox',

        "load-image":"fileupload/load-image.min",
        "load-image-exif":"fileupload/load-image-exif",
        "load-image-ios":"fileupload/load-image-ios",
        "load-image-meta":"fileupload/load-image-meta",
        "canvas-to-blob":"fileupload/canvas-to-blob",


        "jquery.fileupload-validate":"fileupload/jquery.fileupload-validate",
        "jquery.fileupload-process":"fileupload/jquery.fileupload-process",
        "jquery.fileupload-image":"fileupload/jquery.fileupload-image",
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.fileupload":"fileupload/jquery.fileupload"

    }

});