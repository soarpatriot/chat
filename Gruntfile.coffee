module.exports = (grunt) ->
  cssFiles = ['public/stylesheets/bootstrap.css','public/stylesheets/bootstrap-responsive.css',
              'public/stylesheets/font-awesome.min.css','public/stylesheets/font-awesome-ie7.min.css',
              'public/stylesheets/jquery.fileupload-ui.css', 'public/stylesheets/application.css']
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    concat :
      css:
        src: cssFiles
        dest: 'public/stylesheets/all.css'
    cssmin:
      css:
        src:  'public/stylesheets/all.css'
        dest: 'public/stylesheets/all-min.css'

    watch:
      scripts:
        files: cssFiles,
        tasks: ['concat', 'cssmin'],
        options:
          nospawn: true

    requirejs:
      compile:
        options:
          appDir:'public/javascripts/app'

          baseUrl: "public/javascripts/app"
          dir:'public/javascripts/min'

          paths: {

            "application":"app/application",
            "home":"app/home",
            "models":"app/models",
            "review":"app/review",
            "user":"app/user",
            "edit-profile":"app/edit-profile",
            "user-blogs":"app/user-blogs",


            "underscore": "underscore",
            "backbone": "backbone",
            "bootstrap":"bootstrap.min",
            "bootstrapPaginator":"bootstrap-paginator.min",
            "Spinner": "spin.min",
            "jquery": "jquery-1.9.1.min",

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



  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask('default', ['concat', 'cssmin'])


