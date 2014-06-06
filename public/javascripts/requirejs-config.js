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
        "models":"models",
        "review":"review",
        "user":"user",

        "user-blogs":"user-blogs",
        'area':'area',
        //js framework
        "underscore": "../../bower_components/underscore/underscore",
        "backbone": "../../bower_components/backbone/backbone",
        "backbone-pageable": "../../bower_components/backbone-pageable/lib/backbone-pageable.min",
        "bootstrap":"../../bower_components/bootstrap/dist/js/bootstrap.min",
        "bootstrapPaginator":"../../bower_components/bootstrap-paginator/build/bootstrap-paginator.min",
        "animo":"../../bower_components/animo.js/animo",
        "jquery": "../../bower_components/jquery/dist/jquery",
        'select2':"../../bower_components/select2/select2",
        'Showdown':'../../bower_components/showdown/compressed/showdown',
        'google-html5':'../lib/html5',

        /**
         * 'chosen':'chosen.jquery.min',
        jquery: [

            //If the CDN location fails, load from this location

        ],**/
        'spin': '../../bower_components/spinjs/spin',
        'jquery.spin': '../../bower_components/spinjs/jquery.spin',
        'jqBootstrapValidation':'../../bower_components/jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.min',

        'jquery.colorbox':'../../bower_components/jquery-colorbox/jquery.colorbox',

        "load-image":"../lib/load-image.min",
        "load-image-exif":"../lib/load-image-exif",
        "load-image-ios":"../lib/load-image-ios",
        "load-image-meta":"../lib/load-image-meta",
        "canvas-to-blob":"../lib/canvas-to-blob",


        "jquery.fileupload-validate":"../lib/jquery.fileupload-validate",
        "jquery.fileupload-process":"../lib/jquery.fileupload-process",
        "jquery.fileupload-image":"../lib/jquery.fileupload-image",
        "jquery.iframe-transport":"../lib/jquery.iframe-transport",
        "jquery.ui.widget": "../lib/jquery.ui.widget",
        "jquery.fileupload":"../lib/jquery.fileupload"

    }

});