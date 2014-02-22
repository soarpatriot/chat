/**
 * post function js
 *
 */

require.config({

    baseUrl: "/javascripts",
    waitSeconds:100,

    //some special settings. like exports and dep
    shim: {
        'bootstrap':{
            deps: ['jquery']
        },
        "underscore": {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        }
    },

    paths: {
        //js framework
        "jquery": "jquery-2.0.3.min",
        "underscore": "underscore",
        'bootstrap': 'bootstrap.min',
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.fileupload":"fileupload/jquery.fileupload"
    }

});

require(["require","jquery","jquery.iframe-transport","jquery.fileupload","bootstrap"],function(require,$) {

    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        //url:'http://106.186.22.114:8080/upload'
        url:'http://localhost:8888/upload'
    });
    $('#fileupload').fileupload('option', {

        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png)$/,
                maxFileSize: 20000000 // 20MB
            },
            {
                action: 'resize',
                maxWidth: 1440,
                maxHeight: 900
            },
            {
                action: 'save'
            }
        ]
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    $('#fileupload').fileupload({

        dataType: 'json',
        add: function (e, data) {
            $.each(data.files, function (index, file) {
                $('<p/>').text(file.name).appendTo($("#upload-result"));
            });
            /**
             *  {"name":"flamingo (13).js","originalName":"flamingo.js",
             *  "size":79998,"type":"application/javascript","delete_type":"DELETE",
             *  "url":"http://localhost:3000/upload/flamingo%20(13).js",
             *  "delete_url":"http://localhost:3000/upload/flamingo%20(13).js"}
             * @type {*}
             */
            var jqXHR = data.submit()
                .success(function (result, textStatus, jqXHR) {



                })
                .error(function (jqXHR, textStatus, errorThrown) {

                })
                .complete(function (result, textStatus, jqXHR) {
                    console.log("result complete: "+JSON.stringify(result));
                });
            //data.submit();
        },
        change: function (e, data) {
            $.each(data.files, function (index, file) {

            });
        },
        drop: function (e, data) {
            $.each(data.files, function (index, file) {

            });
        },

        done: function (e, data) {

            var fileInfo;
            $.each(data.files, function (index, file) {

            });
        },

        /**
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#percent').text(progress+'%')
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },**/
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#percent').text(progress+'%')
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });


});
