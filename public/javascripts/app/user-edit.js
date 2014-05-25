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
        'jquery.spin': 'jquery.spin',

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
    //"jquery.fileupload-image","jquery.ui.widget",
    //"load-image-exif","load-image-ios","load-image-meta","canvas-to-blob",
    "jquery.spin",
    "bootstrap"],function(require,$,loadImage,_) {

    var opts = {
        lines: 13, // The number of lines to draw
        length: 6, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#FFFFFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '-30', // Top position relative to parent in px
        left: '80' // Left position relative to parent in px
    };
    var $spinner = $('<div></div>');




    $('#change-face-btn').bind('click',function(e){
        e.preventDefault();
        clearDisplay();
        $('#confirm-btn').removeAttr('disabled');

        $('#upload-model').modal('show');
    });

    /**
     * detect file server is available or not
     */
    function detectFileServer(){
        if ($.support.cors) {
            $.ajax({
                //url: '//106.186.22.114:8888/',
                url:'//128.199.205.154:8888/',
                type: 'HEAD'
            }).fail(function () {
                    $('<div class="alert alert-danger"/>')
                        .text('Sorry, 上传头像暂不可用! ')
                        .appendTo('#tip-area');
                });
        }
    }
    detectFileServer();

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
        $('#upload-div').empty();
        $('#tip-area').empty();
    }

    function finishUpload(){
        $('#confirm-btn').removeAttr('disabled');
        if($('#upload-cancel-btn')){
            $('#upload-cancel-btn').attr('disabled',true);
        }
    }
    /**
     * display upload area and progress
     */
    function displayUpload(){
        $('#upload-div').removeClass('fade');
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
        url:'//128.199.205.154:8888/upload',
        dropZone: $('#dropzone'),
        dataType: 'json',
        autoUpload: true,
        uploadType:'face',
        //acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        acceptFileTypes: /(\.|\/)(gif|jpg|jpeg|png)$/i,
        maxFileSize: 5000000, // 5 MB
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 140,
        previewMaxHeight: 140,
        previewCrop: true,
        formData:[{
            name: 'uploadType',
            value: 'face'
        }]

    }).on('fileuploadadd', function (e, data) {

            clearDisplay();
            $('#confirm-btn').attr('disabled','true');
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
                    displayUpload();
                    $spinner.spin(opts);
                    var $temp = $('<div class="alert alert-success"/>')
                        .text('正在保存...').append($spinner);
                    $('#tip-area').append($temp);

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

                        var jqXHR = data.submit().error(function (jqXHR, textStatus, errorThrown) {
                            var error = '上传已取消！';
                            var progress = 0;
                            if (errorThrown === 'abort') {
                                $spinner.spin(false);
                                $('#tip-area').empty();
                                $('<div class="alert alert-danger"/>')
                                    .text(error)
                                    .appendTo($('#tip-area'));
                                $('#progress-bar').text(progress+'%');
                                $('#progress-bar').attr('aria-valuenow',progress);
                                $('#progress-bar').css(
                                    'width',
                                    progress + '%'
                                );
                            }
                        })
                        $('#upload-cancel-btn').click(function (e) {

                            jqXHR.abort();
                            $(this).attr('value',"已取消");
                            $(this).attr('disabled',true);
                           
                            $('#confirm-btn').removeAttr('disabled');
                        });
                    }
                }).fail(function () {
                    if (data.files.error) {
                        console.log( data.files[0].error);
                        $('<div class="alert alert-danger"/>')
                            .text(data.files[0].error)
                            .appendTo($('#tip-area'));
                    }
                });



        }).on('fileuploadprocessalways', function (e, data) {

        }).on('fileuploadprogress', function (e, data) {

            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress-bar').text(progress+'%');
            $('#progress-bar').attr('aria-valuenow',progress);
            $('#progress-bar').css(
                'width',
                progress + '%'
            );

        }).on('fileuploaddone', function (e, data) {
            $('#upload-cancel-btn').attr('disabled',true);
            $.each(data.result.files, function (index, file) {
                if (file.url) {
                    console.log("result complete: "+JSON.stringify(file));

                    if(file){

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
                                $('#image-face').attr('src',file.smallUrl);
                                $spinner.spin(false);
                                finishUpload();
                                $('#tip-area').empty();
                                if(res.code == 0){
                                    //console.log('success');
                                    $('<div class="alert alert-success"/>')
                                        .text('头像更新成功！')
                                        .appendTo($('#tip-area'));
                                }else{
                                    console.log('fail');
                                    $('<div class="alert alert-danger"/>')
                                        .text('头像更新失败！')
                                        .appendTo($('#tip-area'));
                                }
                            },
                            error: function(){
                                $spinner.spin(false);
                                $('#tip-area').empty();
                                finishUpload();

                                $('<div class="alert alert-danger"/>')
                                    .text('头像更新失败！')
                                    .appendTo($('#tip-area'));
                            },
                            dataType: 'json'
                        });

                    }
                } else if (file.error) {
                    finishUpload();
                    $('<div class="alert alert-danger"/>')
                        .text(file.error)
                        .appendTo($('#tip-area'));
                }
            });
        }).on('fileuploadfail', function (e, data) {
            $spinner.spin(false);
            $('#tip-area').empty();
            finishUpload();
            $.each(data.files, function (index, file) {
                var error = '文件上传失败！';
                $('<div class="alert alert-danger"/>')
                    .text(error)
                    .appendTo($('#tip-area'));

            });
        }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');


});
