module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({


    watch: {
      src: {
        files: ['app/**'],
        tasks: ['rebuild-dev']
      }
    },
    // copy index.html all other files (including images) will get processed
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['index.html'],
            dest: 'public/'
          }
        ]
      },
      dev: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['index.html', 'images/**/*.*'],
            dest: 'public/'
          },
          {
            expand: true,
            cwd: 'vendor/',
            src: ['images/**/*.*'],
            dest: 'public/'
          }
        ]
      }
    },

    coffee: {
      compile: {
        files: {
          'public/app/js/main.min.js': ['app/**/*.coffee']
        }
      }
    },

    less: {
      dist: {
        files: {
          "public/css/style.min.css": "app/less/**.less"
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'public/js/main.min.js']
    },

    uglify: {
      dist: {
        files: { 
          'public/app/js/main.min.js': ['public/app/js/main.min.js'],
          'public/js/vendor-scripts.min.js': 'public/js/vendor-scripts.min.js'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'public/js/vendor-scripts.min.js': 'vendor/js/**/*.js',
          'public/css/vendor-css.min.css': 'vendor/css/**/*.css'
        }
      }
    },

    ngtemplates:  {
      dist:      {
        options:  { base: 'app/views' },
        src:      [ 'app/views/**.html' ],
        dest:     'public/templates.js'
        }
    },

    cssmin: {
      compress: {
        files: {
          "public/css/vendor-css.min.css": ["public/css/vendor-css.min.css"],
          "public/css/style.min.css": ["public/css/style.min.css"]
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 1
        },
        files: {
          'public/images/**/*.*': ['app/images/**/*.*', 'vendor/images/**/*.*']
        }
      }
    },

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates'); 
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define your tasks here
  grunt.registerTask('default', ['copy:dist', 'concat', 'coffee', 'jshint', 'uglify', 'less', 'cssmin', 'ngtemplates', 'imagemin']);
  grunt.registerTask('rebuild-dev', ['copy:dev', 'concat', 'coffee', 'jshint', 'less', 'ngtemplates']);
};