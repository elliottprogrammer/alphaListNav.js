
const sass = require('node-sass');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    umd: {
      all: {
        options: {
          src: 'alphaListNav.js',
          dest: 'dist/alphaListNav.min.js', // optional, if missing the src will be used

          // optional, a template from templates subdir
          // can be specified by name (e.g. 'umd'); if missing, the templates/umd.hbs
          // file will be used from [libumd](https://github.com/bebraw/libumd)
          // template: 'path/to/template.hbs',

          // objectToExport: 'library', // optional, internal object that will be exported
          // amdModuleId: 'id', // optional, if missing the AMD module will be anonymous
          // globalAlias: 'alias', // optional, changes the name of the global variable

          // deps: { // optional, `default` is used as a fallback for rest!
          //   'default': ['foo', 'bar'],
          //   amd: ['foobar', 'barbar'],
          //   cjs: ['foo', 'barbar'],
          //   global: ['foobar', {depName: 'param'}]
          // }
        }
      }
    },
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
          'dist/alphaListNav.min.css': ['dist/alphaListNav.css'],
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-umd');


  grunt.registerTask('default', [
    'babel',
    'uglify',
    'umd:all',
    'sass',
    'cssmin',
  ]);
};
