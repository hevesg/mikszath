//require('load-grunt-tasks')(grunt);
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
        options: {
          options: {
            //paths: ['app/bootstrap/less']
          },
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
        },
        files: {
          'themes/mixat/build/mixat.css': 'themes/mixat/src/less/bootstrap.less',
          'themes/mixat/build/mixat.import.css': 'themes/mixat/src/less/imports.less'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        keepSpecialComments:1
      },
      target: {
        files: {
          'themes/mixat/build/mixat.module.css': ['themes/mixat/build/mixat.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */ '
      },
      build: {
        src: 'themes/mixat/build/<%= pkg.name %>.js',
        dest: 'themes/mixat/build/<%= pkg.name %>.min.js'
      }
    },
    browserify: {
      main: {
        src: 'themes/mixat/src/js/index.js',
        dest: 'themes/mixat/build/<%= pkg.name %>.js'
      }
    },

    watch: {
      scripts: {
        files: ['**/src/**/*.js'],
        tasks: ['js'],
      },
      styles: {
        files: ['**/src/**/*.less'],
        tasks: ['css'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('css', ['less', 'cssmin']);
  grunt.registerTask('js', ['browserify', 'uglify']);
  grunt.registerTask('default', ['js','css']);
};
