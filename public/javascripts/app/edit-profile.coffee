###
  user edit profile coffee-script
###

list = ['jquery','underscore','filepicker','bootstrap','jquery.fileupload','jquery.fileupload-process','jquery.fileupload-resize','jquery.fileupload-validate','jquery.iframe-transport']

require list, ($,_,filepicker) ->
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


