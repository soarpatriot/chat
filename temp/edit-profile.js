// Generated by CoffeeScript 1.6.3
/*
  user edit profile coffee-script
*/


(function() {
  require.config({
    baseUrl: '/javascripts',
    shim: {
      'underscore': {
        exports: '_'
      },
      'filepicker': {
        exports: 'filepicker'
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'jquery.fileupload': {
        deps: ['jquery']
      },
      'jquery.fileupload-process': {
        deps: ['jquery']
      },
      'jquery.fileupload-resize': {
        deps: ['jquery']
      },
      'jquery.fileupload-ui': {
        deps: ['jquery']
      },
      'jquery.fileupload-validate': {
        deps: ['jquery']
      },
      'jquery.iframe-transport': {
        deps: ['jquery']
      },
      'jquery.jquery.ui.widget': {
        deps: ['jquery']
      },
      'load-image': {
        deps: ['jquery']
      },
      'tmpl': {
        deps: ['jquery']
      },
      'canvas-to-blob': {
        deps: ['jquery']
      }
    },
    paths: {
      'jquery': 'jquery-1.9.1.min',
      'underscore': 'underscore',
      'bootstrap': 'bootstrap.min',
      'jquery.fileupload': 'jquery-fileuploader/jquery.fileupload',
      'jquery.fileupload-process': 'jquery-fileuploader/jquery.fileupload-process',
      'jquery.fileupload-resize': 'jquery-fileuploader/jquery.fileupload-resize',
      'jquery.fileupload-ui': 'jquery-fileuploader/jquery.fileupload-ui',
      'jquery.fileupload-validate': 'jquery-fileuploader/jquery.fileupload-validate',
      'jquery.iframe-transport': 'jquery-fileuploader/jquery.iframe-transport',
      'jquery.ui.widget': 'jquery-fileuploader/vendor/jquery.ui.widget',
      'load-image': 'jquery-fileuploader/load-image.min',
      'tmpl': 'jquery-fileuploader/temp.min',
      'canvas-to-blob': 'jquery-fileuploader/canvas-to-blob.min',
      'filepicker': '//api.filepicker.io/v1/filepicker'
    }
  });

  require(['jquery', 'underscore', 'filepicker', 'bootstrap', 'jquery.fileupload', 'jquery.fileupload-process', 'jquery.fileupload-resize', 'jquery.fileupload-validate', 'jquery.iframe-transport'], function($, _, filepicker) {
    return $(function() {
      $('#fileupload').fileupload({
        option: {
          maxFileSize: 5000000,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png|js)$/i,
          process: [
            {
              action: 'load',
              fileTypes: /^image\/(gif|jpeg|png|js)$/,
              maxFileSize: 20000000
            }, {
              action: 'resize',
              maxWidth: 1440,
              maxHeight: 900
            }, {
              action: 'save'
            }
          ]
        }
      });
      $('#fileupload').fileupload({
        url: '/upload',
        dataType: 'json',
        add: function(e, data) {
          var jqXHR;
          return jqXHR = data.submit().success(function(result, textStatus, jqXHR) {
            return console.log("result: " + JSON.stringify(result));
          }).error(function(result, textStatus, jqXHR) {
            return console.log("result: " + JSON.stringify(result));
          }).complete(function(result, textStatus, jqXHR) {
            return console.log("result: " + JSON.stringify(result));
          });
        }
      });
      /*
        filepicker.pick(function(FPFile){
                       //console.log(FPFile.url);
                      $('#file-show').attr('src',FPFile.url);
                  });
                mimetypes: ['image/*', 'text/plain'],
        container: 'modal',
        maxSize: 1024*1024,
        services:['COMPUTER'],
      */

      filepicker.setKey('AIx95TAXR36y0pnGLrXCWz');
      return $('#upload-face-btn').click(function() {
        return filepicker.pick({
          mimetypes: ['image/*', 'text/plain'],
          container: 'modal',
          services: ['COMPUTER']
        }, function(FPfile) {
          console.log(JSON.stringify(FPfile));
          $('#face-id').val(FPfile.url);
          return $('#image-face').attr('src', FPfile.url + '/convert?w=150&h=150');
        });
      });
    });
  });

}).call(this);
