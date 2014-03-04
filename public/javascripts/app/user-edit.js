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
        "load-image":"fileupload/load-image.min",
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.fileupload":"fileupload/jquery.fileupload"
    }

});

require(["require","jquery","load-image","underscore","jquery.iframe-transport","jquery.fileupload","bootstrap"],function(require,$,loadImage,_) {

    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        //url:'http://106.186.22.114:8080/upload'
        url:'http://localhost:8888/upload',
        dropZone: $('#dropzone')
    });
    $('#fileupload').fileupload('option', {

        maxFileSize: 10000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png)$/,
                maxFileSize: 10000000 // 10MB
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


    $(document).bind('dragover', function (e) {
        var dropZone = $('#dropzone'),
            timeout = window.dropZoneTimeout;
        if (!timeout) {
            dropZone.addClass('in');
        } else {
            clearTimeout(timeout);
        }
        var found = false,
            node = e.target;
        do {
            if (node === dropZone[0]) {
                found = true;
                break;
            }
            node = node.parentNode;
        } while (node != null);
        if (found) {
            dropZone.addClass('hover');
        } else {
            dropZone.removeClass('hover');
        }
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
        }, 3000);
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

    /**
     * clear the previous upload image
     */
    function clearDisplay(){

        $('#upload-div').removeClass('fade');
        $('#upload-div').empty();
    }

    function obtainFileInfo(file){
        var size = file.size;
        var kbSize = size/1024;
        var sizeText = kbSize/1024 > 0 ? (kbSize/1024).toFixed(2) + ' MB' : kbSize.toFixed(2) + ' KB';

        var fileInfo = {
            name:file.name,
            size:sizeText
        }
        return fileInfo;
    }

    $('#fileupload').fileupload({

        dataType: 'json',
        add: function (e, data) {

            clearDisplay();

            var fileTmp = _.template($('#file-template').html());
            $('#upload-div').append(fileTmp(obtainFileInfo(data.files[0])));

            var loadingImage = loadImage(
                data.files[0],
                function (img) {
                    var $image = $(img);
                    $image.addClass('img-responsive').addClass('img-thumbnail');
                    $('#display-area').append($image);
                },
                {   maxWidth:140,
                    maxHeight:140,
                    canvas:true
                }
            );
            //loadingImage.onload = loadingImage.onerror = null;
            /*
            $.each(data.files, function (index, file) {
                $('<p/>').text(file.name).appendTo($("#upload-result"));
            });**/
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
                    //result = JSON.stringify(result)
                    var files = result.responseJSON.files;

                    console.log('responseText:'+JSON.stringify(files));
                    if(files && files[0]){
                        console.log('url:'+files[0].thumbnailUrl);
                        $('#image-face').attr('src',files[0].smallUrl);

                        var params = {
                            url: files[0].url,
                            deleteUrl: files[0].deleteUrl,
                            smallUrl:files[0].smallUrl,
                            thumbnailUrl: files[0].thumbnailUrl,
                            miniUrl:files[0].miniUrl
                        };
                        $.ajax({
                            type: 'POST',
                            url: '/users/face',
                            data: params,
                            success: function(res){
                                console.log('success '+res);
                            },
                            dataType: 'json'
                        });

                    }
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
            $('#progress-bar').text(progress+'%');
            $('#progress-bar').attr('aria-valuenow',progress);
            $('#progress-bar').css(
                'width',
                progress + '%'
            );
        }
    });


});
