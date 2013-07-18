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

    watch: {
      scripts: {
        files: cssFiles,
        tasks: ['concat', 'cssmin'],
        options: {
          nospawn: true,
        },
      },
    },
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask('default', ['concat', 'cssmin'])


