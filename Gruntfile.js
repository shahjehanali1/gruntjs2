module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['developement/js/*.js'],
                dest: 'build/js/plugins.js',
            },
        },
        less: {

            development: {
                files: {
                    "build/css/styles.css": "developement/less/styles.less"
                }
            },
        },
        sass: {                              // Task 
            dist: {                            // Target 
              options: {                       // Target options 
                style: 'expanded',
                lineNumbers: true,
              },
              files: {                         // Dictionary of files 
                'build/css/main.css': 'developement/scss/main.scss',       // 'destination': 'source' 
              }
            }
        },
        connect: {
            sever: {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    base: 'build/',
                    livereload: true,
                }
            }
        },
        jade: {
          compile: {
            options: {
              data: {
                debug: false,
              },
              pretty: true,
            },
            files: {
              "build/about.html": "developement/about.jade",

            }
          }
        },
        watch: {
            options: {
                spawn: false,
                livereload: true,
            },
            scripts: {
                files: ['developement/js/**/*.js', 'developement/less/**/*.less', 'developement/scss/**/*.scss', 'build/*.html', 'build/*.jade'],
                tasks: ['concat', 'less', 'sass', 'imagemin', 'jade'],
            },
        },
        imagemin: {
           dist: {
              options: {
                optimizationLevel: 5
              },
              files: [{
                 expand: true,
                 cwd: 'build/img/',
                 src: ['**/*.{png,jpg,gif, svg}'],
                 dest: 'build/img/'
              }]
           }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['concat', 'less', 'imagemin', 'jade', 'sass', 'connect', 'watch']);
};
