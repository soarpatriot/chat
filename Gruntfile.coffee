module.exports = (grunt) ->

  ##'public/stylesheets/font-awesome.min.css','public/stylesheets/font-awesome-ie7.min.css',
  ##'public/stylesheets/jquery.fileupload-ui.css',
  ##'public/stylesheets/bootstrap-theme.css',
  cssFiles = ['public/stylesheets/bootstrap.css',
              'public/stylesheets/animate+animo.css',
              'public/stylesheets/select2.css',
              'public/stylesheets/chosen.css',
              'public/stylesheets/jquery.fileupload.css',
              'public/stylesheets/jquery.fileupload-ui.css',
              'public/stylesheets/jquery.fileupload-ui-noscript.css',
              'public/stylesheets/colorbox.css',
              'public/stylesheets/application.css']
  delOptions = {
    force: true
  };

  config =
    public: 'public'
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
      coffee:
        files: ['public/javascripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      js:
        files: ['public/javascripts/{,*/}*.js'],
        tasks: ['requirejs']

    requirejs:

      compile:
        options:
          logLevel: 0
          # appDir:'public/javascripts/app'
          mainConfigFile: 'public/javascripts/app/requirejs-config.js'
          done: (done, output) ->
            #console.log 'start'
            #grunt.file.recurse 'public/javascripts/build', (abspath, rootdir, subdir, filename) ->
              #console.log rootdir
              #console.log subdir
              #grunt.file.delete('./public/build',delOptions)
            done
          appDir:'public/javascripts'
          # baseUrl: "public/javascripts"
          baseUrl:'./app/'
          dir:'public/build'
          fileExclusionRegExp: /.coffee$/
          paths:
            filepicker: "empty:"
          modules:[
              {name:'application'},
              {name:'models'},
              {name:'home'},
              {name:'post-show'},

              {name:'post-article'},
              {name:'user-edit'},
              {name:'reg'},
              {name:'user'},
              {name:'review'},
              {name:'user-blogs'},
              {name:'user-show'}
          ]


    clean:
      js: ["!public/build/app","public/build/*.*","public/build/*.*","public/build/*.*"]

    coffee: {
      options: {
        includePaths: [
          'bower_components'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.public %>/javascripts',
          src: ['*.coffee'],
          dest: '<%= config.public %>/javascripts',
          ext: '.js'
        }]
      }
    }

  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')
  #grunt.loadNpmTasks('grunt-clean')

  grunt.registerTask 'clean-source', ['clean']
  grunt.registerTask 'css', ['concat', 'cssmin']
  grunt.registerTask 'default', ['concat', 'cssmin','requirejs']



