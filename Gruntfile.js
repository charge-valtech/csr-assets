module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dev: {
        src: ['js/*.js', '!js/scripts.js', '!js/vendor/**'],
        dest: '_compiled/js/scripts.js'
      }
    },
    jshint: {
      files: ['*.js', 'js/*.js', '!js/vendor/**'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    assemble: {
      options: {
        flatten: false,
        expand: true,
        assets: '_compiled',
        layout: 'default.hbs',
        layoutdir: 'templates/layouts',
        partials: ['templates/partials/*.hbs']
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'templates/pages/',
          src: '**/*.hbs',
          ext: '.html'
        }]
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: ['scss'],
          outputStyle: 'compressed',
          sourceMap: true
        },
        files: {
          '_compiled/css/main.css': 'scss/main.scss',
          '_compiled/css/main-ie8.css': 'scss/main-ie8.scss'
        }
      },
    },
    watch: {
      options: {
        livereload: 35892,
        spawn: false
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['js/**/*.js', '!js/scripts.min.js', '!js/scripts.js'],
        tasks: ['jshint', 'concat:dev', 'copy:vendorjs']
      },
      hbs: {
        files: ['templates/{,*/}*.hbs', 'templates/{,*/*/}*.hbs'],
        tasks: ['assemble']
      }
    },
    replace: {
      map: {
        src: ['_compiled/css/*.css'],
        overwrite: true,
        replacements: [{
          from: 'sourceMappingURL=main.css.map',
          to: 'Map removed'
        }, {
          from: 'sourceMappingURL=main-ie8.css.map',
          to: 'Map removed'
        }]
      }
    },
    copy: {
      vendorjs: {
        expand: true,
        cwd: 'js/vendor/',
        src: [
          '**/*'
          ],
        dest: '_compiled/js/vendor/'
      },
      static: {
        expand: true,
        cwd: 'static/',
        src: [
          '**/*'
          ],
        dest: '_compiled/'
      },
      ft_assets: {
        expand: true,
        cwd: '_compiled/',
        src: [
          '**/*'
          ],
        dest: '../fasttrack-frontend/public/'
      },
      fs_assets: {
        expand: true,
        cwd: '_compiled/',
        src: [
          '**/*'
          ],
        dest: '../faststream-frontend/public/'
      }
    },
    connect: {
      server: {
        options: {
          port: 7200,
          livereload: 35892,
          open: true
        }
      }
    }

  });

  [
    'grunt-assemble',
    'grunt-browser-sync',
    'grunt-contrib-clean',
    'grunt-contrib-concat',
    'grunt-contrib-jshint',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-sass',
    'grunt-text-replace'
  ].forEach(function(task) {
      grunt.loadNpmTasks(task);
  });

  grunt.registerTask('images', ['imageoptim']);

  grunt.registerTask('default', ['assemble', 'concat:dev', 'copy:vendorjs', 'copy:static', 'sass', 'connect', 'watch']);

  grunt.registerTask('deploy', ['buildcontrol:prototypeheroku']);

};
