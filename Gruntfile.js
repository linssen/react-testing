module.exports = function (grunt) {
    'use strict';

    var scripts;

    scripts = {'src/static/scripts/dist/<%= pkg.name %>.js': [
        'src/static/bower_components/jquery/jquery.js',
        'src/static/bower_components/react/react.js',
        'src/static/bower_components/showdown/src/showdown.js',
        'src/static/scripts/**/*.js',
        'src/static/scripts/dist/*.jsx.js',
        '!src/static/scripts/dist/<%= pkg.name %>.js'
    ]};

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: scripts
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'src/static/scripts/**/*.js',
                    'src/static/components/**/*.jsx',
                    '!src/static/scripts/dist/*.js'
                ],
                tasks: ['react', 'concat']
            },
            styles: {
                files: [
                    'src/static/styles/screen.scss',
                    '!src/static/styles/dist/*.css'
                ],
                tasks: ['sass:dev']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'src/static/styles/dist/<%= pkg.name %>.css': 'src/static/styles/screen.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: {
                    'src/static/styles/dist/<%= pkg.name %>.css': 'src/static/styles/screen.scss'
                }
            },
        },
        concat: {
            scripts: {
                files: scripts
            },
            test: {
                files: {'src/static/scripts/dist/<%= pkg.name %>.js':
                    scripts['src/static/scripts/dist/<%= pkg.name %>.js'].map(function (d) {
                        return d.replace(/react.js$/, 'react-with-addons.js');
                    })
                }
            }
        },
        react: {
            dist: {
                files: {
                    'src/static/scripts/dist/<%= pkg.name %>.jsx.js': 'src/static/components/**/*.jsx'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'src/static/test/karma.conf.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['sass:dist', 'react', 'uglify']);
    grunt.registerTask('test', ['react', 'concat:test', 'karma']);

};