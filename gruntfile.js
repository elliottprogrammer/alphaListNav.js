const sass = require('node-sass');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		babel: {
			options: {
				// sourceMap: true,
				presets: ['@babel/preset-env'],
				plugins: [
					'@babel/plugin-proposal-class-properties',
					'@babel/plugin-proposal-object-rest-spread',
				],
			},
			target: {
				files: {
					'dist/alphaListNav.js': 'alphaListNav.js',
				},
			},
		},
		umd: {
			target: {
				options: {
					src: 'dist/alphaListNav.js',
					dest: 'dist/alphaListNav.js', // optional, if missing the src will be used
					objectToExport: 'AlphaListNav',
				},
			},
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner:
					'/*! <%= pkg.name %>.js - v<%= pkg.version %>\n' +
					'Build Date: <%= grunt.template.today("mm-dd-yyyy") %>\n' +
					'Author: <%= pkg.author %>\n' +
					'Git Repository: <%= pkg.repository.url %> */\n',
				report: 'min',
				mangle: false,
				compress: {},
			},
			target: {
				files: {
					'dist/alphaListNav.min.js': ['dist/alphaListNav.js'],
				},
			},
		},
		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
			},
			target: {
				files: {
					'dist/alphaListNav.css': 'alphaListNav.scss',
				},
			},
		},
		cssmin: {
			target: {
				files: {
					'dist/alphaListNav.min.css': ['dist/alphaListNav.css'],
				},
			},
		},
		copy: {
			docsCss: {
				expand: true,
				src: 'dist/*.min.css',
				dest: 'docs/assets/css/',
				flatten: true,
				filter: 'isFile',
			},
			docsJs: {
				expand: true,
				src: 'dist/*.min.js',
				dest: 'docs/assets/js/',
				flatten: true,
				filter: 'isFile',
			},
		},
		watch: {
			js: {
				files: './alphaListNav.js',
				tasks: ['babel', 'umd', 'uglify'],
				options: {
					spawn: false,
				},
			},
			sass: {
				files: './alphaListNav.scss',
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false,
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-umd');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'babel',
		'umd',
		'uglify',
		'sass',
		'cssmin',
		'copy',
	]);

	grunt.registerTask('build', ['babel', 'umd', 'uglify', 'sass', 'cssmin']);
	grunt.registerTask('publish-docs', ['copy']);
	grunt.registerTask('build:all', [
		'babel',
		'umd',
		'uglify',
		'sass',
		'cssmin',
		'copy',
	]);
};
