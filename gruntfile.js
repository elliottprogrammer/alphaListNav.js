
const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
          options: {
            sourceMap: true,
            presets: ['@babel/preset-env'],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
            ]
          },
          dist: {
            files: {
              'dist/alphaListNav.js': 'alphaListNav.js'
            }
          }
        },
        uglify: {
            options: {
              // the banner is inserted at the top of the output
              banner: '/*! <%= pkg.name %>.js - v<%= pkg.version %>\n' +
                'Build Date: <%= grunt.template.today("mm-dd-yyyy") %>\n' +
                'Author: <%= pkg.author %>\n' +
                'Git Repository: <%= pkg.repository.url %> */\n'
            },
            dist: {
              files: {
                'dist/alphaNistNav.min.js': ['dist/alphaListNav.js']
              }
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/alphaListNav.css': 'alphaListNav.scss',
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/alphaListNav.min.css' : ['dist/alphaListNav.css'],
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

      
    grunt.registerTask('default', [
        'babel',
        'uglify',
        'sass',
        'cssmin',
    ]);
};
