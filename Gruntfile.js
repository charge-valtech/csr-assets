module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                src: ['www/_assets/js/*.js', '!www/_assets/js/prototype.js', '!www/_assets/js/region-selector.js', '!www/_assets/js/scripts.js', '!www/_assets/js/scripts.min.js'],
                dest: 'www/_assets/js/scripts.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'www/_assets/js/scripts.min.js': ['www/_assets/js/scripts.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js'],
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
        sass: {
            dev: {
                options: {
                    includePaths: ['scss'],
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                files: {
                    'www/_assets/css/main.css': 'scss/main.scss',
                    'www/_assets/css/main-ie8.css': 'scss/main-ie8.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: 34892,
                spawn: false
            },
            css: {
                files: ['../csr-assets/scss/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['www/_assets/js/**/*.js', '!www/_assets/js/scripts.min.js', '!www/_assets/js/scripts.js'],
                tasks: ['jshint', 'concat:dev']
            }
        },
        replace: {
          map: {
            src: ['www/_assets/css/*.css'],
            overwrite: true,
            replacements: [{
                from: 'sourceMappingURL=main.css.map',
                to: 'Map removed'
            }, {
                from: 'sourceMappingURL=main-ie8.css.map',
                to: 'Map removed'
            }]
          },
          scripts: {
            src: ['www/apprentice/*.html', 'www/*.html'],
            overwrite: true,
            replacements: [{
                from: 'scripts.js',
                to: 'scripts.min.js'
            }]
          }
        },
        copy: {
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
                    port: 7100,
                    base: 'www',
                    livereload: 34892,
                    open: true
                }
            }
        }

    });

    [
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-sass',
        'grunt-contrib-concat',
        'grunt-text-replace',
        'grunt-contrib-watch',
        'grunt-contrib-clean',
        'grunt-contrib-compress',
        'grunt-browser-sync',
        'grunt-contrib-connect'
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('images', ['imageoptim']);

    grunt.registerTask('dev', ['jshint', 'concat:dev', 'sass', 'assemble', 'connect', 'watch']);

    grunt.registerTask('deploy', ['buildcontrol:prototypeheroku']);

};
