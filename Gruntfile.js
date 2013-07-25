// Generated by CoffeeScript 1.6.2
(function() {
  module.exports = function(grunt) {
    var cssFiles;

    cssFiles = ['public/stylesheets/bootstrap.css', 'public/stylesheets/bootstrap-responsive.css', 'public/stylesheets/font-awesome.min.css', 'public/stylesheets/font-awesome-ie7.min.css', 'public/stylesheets/jquery.fileupload-ui.css', 'public/stylesheets/application.css', '!all*.css'];
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        css: {
          src: cssFiles,
          dest: 'public/stylesheets/application-all.css'
        }
      },
      cssmin: {
        css: {
          src: 'public/stylesheets/application-all.css',
          dest: 'public/stylesheets/application-all-min.css'
        }
      },
      watch: {
        scripts: {
          files: cssFiles,
          tasks: ['concat', 'cssmin'],
          options: {
            nospawn: true
          }
        }
      },
      requirejs: {
        compile: {
          options: {
            mainConfigFile: 'public/javascripts/app/requirejs-config.js',
            baseUrl: "public/javascripts",
            dir: 'public/build',
            paths: {
              filepicker: "empty:"
            },
            modules: [
              {
                name: 'app/application'
              }, {
                name: 'app/models'
              }, {
                name: 'app/home'
              }, {
                name: 'app/post-show'
              }, {
                name: 'app/edit-profile'
              }, {
                name: 'app/reg'
              }, {
                name: 'app/user'
              }, {
                name: 'app/review'
              }, {
                name: 'app/user-blogs'
              }, {
                name: 'app/user-show'
              }
            ]
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    return grunt.registerTask('default', ['concat', 'cssmin', 'requirejs']);
  };

}).call(this);

/*
//@ sourceMappingURL=Gruntfile.map
*/
