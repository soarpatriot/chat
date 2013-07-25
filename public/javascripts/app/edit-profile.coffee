###
  user edit profile coffee-script
###
require.config
  baseUrl: '/javascripts',
  shim:
    'underscore': {
      exports: '_'
    },
    'filepicker':{
      exports: 'filepicker'
    },
    'bootstrap':{
      deps: ['jquery']
    },
    'jquery.fileupload':{
      deps: ['jquery']
    },
    'jquery.fileupload-process':{
      deps: ['jquery']
    },
    'jquery.fileupload-resize':{
      deps: ['jquery']
    },
    'jquery.fileupload-ui':{
      deps: ['jquery']
    },
    'jquery.fileupload-validate':{
      deps: ['jquery']
    },
    'jquery.iframe-transport':{
      deps: ['jquery']
    },
    'jquery.jquery.ui.widget':{
      deps: ['jquery']
    },
    'load-image':{
      deps: ['jquery']
    },
    'tmpl':{
      deps: ['jquery']
    },
    'canvas-to-blob':{
      deps: ['jquery']
    }

  paths:
    'jquery': 'jquery-1.9.1.min'
    'underscore': 'underscore'
    'bootstrap':'bootstrap.min'
    'jquery.fileupload':'jquery-fileuploader/jquery.fileupload',
    'jquery.fileupload-process':'jquery-fileuploader/jquery.fileupload-process',
    'jquery.fileupload-resize':'jquery-fileuploader/jquery.fileupload-resize',
    'jquery.fileupload-ui':'jquery-fileuploader/jquery.fileupload-ui',
    'jquery.fileupload-validate':'jquery-fileuploader/jquery.fileupload-validate',
    'jquery.iframe-transport':'jquery-fileuploader/jquery.iframe-transport',
    'jquery.ui.widget':'jquery-fileuploader/vendor/jquery.ui.widget',

    'load-image':'jquery-fileuploader/load-image.min',
    'tmpl':'jquery-fileuploader/temp.min',
    'canvas-to-blob':'jquery-fileuploader/canvas-to-blob.min'

    'filepicker':'//api.filepicker.io/v1/filepicker'




require ['jquery','underscore','filepicker','bootstrap','jquery.fileupload','jquery.fileupload-process','jquery.fileupload-resize','jquery.fileupload-validate','jquery.iframe-transport'], ($,_,filepicker) ->
    $ ->
      $('#fileupload').fileupload
        option:
          maxFileSize: 5000000,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png|js)$/i,
          process: [
              {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png|js)$/,
                maxFileSize: 20000000
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
      $('#fileupload').fileupload
        url:'/upload',
        dataType: 'json'
        add: (e,data)->
          jqXHR = data.submit().success (result,textStatus,jqXHR)->
                                 console.log "result: "+JSON.stringify result

                               .error (result,textStatus,jqXHR)->
                                 console.log "result: "+JSON.stringify result

                               .complete (result,textStatus,jqXHR)->
                                 console.log "result: "+JSON.stringify result
      ###
        filepicker.pick(function(FPFile){
                       //console.log(FPFile.url);
                      $('#file-show').attr('src',FPFile.url);
                  });
                mimetypes: ['image/*', 'text/plain'],
        container: 'modal',
        maxSize: 1024*1024,
        services:['COMPUTER'],
      ###


      filepicker.setKey('AIx95TAXR36y0pnGLrXCWz')
      $('#upload-face-btn').click ->
        filepicker.pick
            mimetypes: ['image/*', 'text/plain'],
            container: 'modal',
            services:['COMPUTER']
            (FPfile) ->
              console.log JSON.stringify(FPfile)
              $('#face-id').val FPfile.url
              $('#image-face').attr 'src',FPfile.url


