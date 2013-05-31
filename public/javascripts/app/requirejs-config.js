require.config({

    baseUrl: "/javascripts",
    waitSeconds:100,

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
        },
        'filepicker':{
            exports: 'filepicker'
        }

    },

    paths: {
        //application own js module
        "application":"app/application",
        "home":"app/home",
        "models":"app/models",
        "review":"app/review",
        "user":"app/user",
        "edit-profile":"app/edit-profile",
        "user-blogs":"app/user-blogs",

        //js framework
        "underscore": "underscore",
        "backbone": "backbone",
        "bootstrap":"bootstrap.min",
        "bootstrapPaginator":"bootstrap-paginator.min",
        "Spinner": "spin.min",
        jquery: [

            //If the CDN location fails, load from this location
            'jquery-1.9.1.min'
        ],
        "jquery.fileupload":"jquery-fileuploader/jquery.fileupload",
        "jquery.fileupload-process":"jquery-fileuploader/jquery.fileupload-process",
        "jquery.fileupload-resize":"jquery-fileuploader/jquery.fileupload-resize",
        "jquery.fileupload-ui":"jquery-fileuploader/jquery.fileupload-ui",
        "jquery.fileupload-validate":"jquery-fileuploader/jquery.fileupload-validate",
        "jquery.iframe-transport":"jquery-fileuploader/jquery.iframe-transport",
        "jquery.ui.widget":"jquery-fileuploader/vendor/jquery.ui.widget",

        "load-image":"jquery-fileuploader/load-image.min",
        "tmpl":"jquery-fileuploader/temp.min",
        "canvas-to-blob":"jquery-fileuploader/canvas-to-blob.min",

        "filepicker":"//api.filepicker.io/v1/filepicker"

    }

});