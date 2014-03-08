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

require(["require","jquery","load-image","underscore","jquery.iframe-transport","jquery.fileupload","jquery.fileupload-validate",
   "jquery.fileupload-image","jquery.ui.widget",
    "load-image-exif","load-image-ios","load-image-meta","canvas-to-blob",
    ,"bootstrap"],function(require,$,loadImage,_) {


    if ($.support.cors) {
        $.ajax({
            url: '//jquery-file-upload.appspot.com/',
            type: 'HEAD'
        }).fail(function () {
            $('<div class="alert alert-danger"/>')
                .text('Sorry, 上传头像暂不可用 - ' +
                    new Date())
                .appendTo('#fileupload');
        });
    }




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



    /**
     * clear the previous upload image
     */
    function clearDisplay(){

        $('#upload-div').removeClass('fade');
        $('#upload-div').empty();
        $('#tip-area').empty();
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
        url:'http://localhost:8888/upload',
        dropZone: $('#dropzone'),
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 5000000, // 5 MB
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 140,
        previewMaxHeight: 140,
        previewCrop: true

    }).on('fileuploadadd', function (e, data) {

            clearDisplay();
            if (e.isDefaultPrevented()) {
                return false;
            }
            var $this = $(this),
                that = $this.data('blueimp-fileupload') ||
                    $this.data('fileupload'),
                options = that.options;

            data.process(function () {
                return $this.fileupload('process', data);
            }).always(function () {

                }).done(function () {

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

                    if ((options.autoUpload || data.autoUpload) && data.autoUpload !== false) {
                        data.submit();
                    }
                }).fail(function () {
                    if (data.files.error) {

                        console.log(data.files.error);
                        console.log( data.files[0].error);
                        $('<div class="alert alert-danger"/>')
                            .text(data.files[0].error)
                            .appendTo($('#tip-area'));
                    }
                });



        }).on('fileuploadprocessalways', function (e, data) {

        }).on('fileuploadprogressall', function (e, data) {

            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress-bar').text(progress+'%');
            $('#progress-bar').attr('aria-valuenow',progress);
            $('#progress-bar').css(
                'width',
                progress + '%'
            );

        }).on('fileuploaddone', function (e, data) {
            $.each(data.result.files, function (index, file) {
                if (file.url) {
                    console.log("result complete: "+JSON.stringify(file));

                    if(file){

                        $('#image-face').attr('src',file.smallUrl);

                        var params = {
                            url: file.url,
                            deleteUrl: file.deleteUrl,
                            smallUrl:file.smallUrl,
                            thumbnailUrl: file.thumbnailUrl,
                            miniUrl:file.miniUrl
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
                } else if (file.error) {
                    var error = $('<span class="text-danger"/>').text(file.error);
                    $(data.context.children()[index])
                        .append('<br>')
                        .append(error);
                }
            });
        }).on('fileuploadfail', function (e, data) {
            $.each(data.files, function (index, file) {
                var error = $('<span class="text-danger"/>').text('File upload failed.');
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            });
        }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');


});
