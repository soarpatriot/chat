module.exports = (grunt) ->

  ##'public/stylesheets/font-awesome.min.css','public/stylesheets/font-awesome-ie7.min.css',
  ##'public/stylesheets/jquery.fileupload-ui.css',
  ##'public/stylesheets/bootstrap-theme.css',
  cssFiles = ['public/stylesheets/bootstrap.css',
              'public/stylesheets/animate+animo.css',
              'public/stylesheets/select2.css',
              'public/stylesheets/chosen.css',
              'public/stylesheets/application.css']
  delOptions = {
    force: true
  };
  grunt.initConfig
    pkg:[grunt.file.readJSON('package.json')]

    concat :
      css:
        src: cssFiles
        dest: 'public/stylesheets/application-all.css'
    cssmin:
      css:
        src:  'public/stylesheets/application-all.css'
        dest: 'public/stylesheets/application-all-min.css'

    watch:
      scripts:
        files: cssFiles,
        tasks: ['concat', 'cssmin'],
        options:
          nospawn: true

    requirejs:
      compile:
        options:
          # appDir:'public/javascripts/app'
          mainConfigFile: 'public/javascripts/app/requirejs-config.js'
          done: (done, output) ->
            #console.log 'start'
            #grunt.file.recurse 'public/javascripts/build', (abspath, rootdir, subdir, filename) ->
              #console.log rootdir
              #console.log subdir
              #grunt.file.delete('./public/build',delOptions)
            done

          baseUrl: "public/javascripts"
          dir:'public/build'
          fileExclusionRegExp: /.coffee$/
          paths:
            filepicker: "empty:"

          modules:[
            {name:'app/application'},
            {name:'app/models'},
            {name:'app/home'},
            {name:'app/post-show'},

            {name:'app/post-article'},
            {name:'app/edit-profile'},
            {name:'app/reg'},
            {name:'app/user'},
            {name:'app/review'},
            {name:'app/user-blogs'},
            {name:'app/user-show'}
          ]

    clean:

        src: ['public/build'],

        filter: (filepath)->
          console.log filepath
          if(grunt.file.exists(filepath) && !grunt.file.isDir(filepath) )
            grunt.file.delete(filepath,delOptions)


  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask 'css', ['concat', 'cssmin']
  grunt.registerTask 'default', ['concat', 'cssmin','requirejs']



