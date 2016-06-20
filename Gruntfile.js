module.exports = function (grunt) {
	grunt.initConfig({
		less: {
			development: {
				options: {
					compress: false,
					cleancss: false,
					optimization: 2,
					dumpLineNumbers: 'false'
				},
				files: {
					"assets/css/style.css": "assets/less/style.less"
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			styles: {
				files: ['assets/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		},
		copy: {
			dist: {
				files: [
					{
						src: ['index.html'],
						dest: 'dist/'
					},
					{
						src: ['assets/font/**', 'assets/image/**'],
						dest: 'dist/'
					},
					{
						cwd: 'lib/components-font-awesome/',
						src: ['fonts/**'],
						dest: 'dist/assets/',
						expand: true
					},
					{
						src: 'lib/jquery/dist/jquery.min.js',
						dest: 'dist/lib/jquery/dist/jquery.js'
					},
					{
						src: 'lib/moment/min/moment.min.js',
						dest: 'dist/lib/moment/moment.js'
					},
					{
						src: 'lib/validate/validate.min.js',
						dest: 'dist/lib/validate/validate.js'
					},
					{
						src: 'app/**/*.stache',
						dest: 'dist/'
					}
				]
			}
		},
		cssmin: {
			dist: {
				files: {
					"dist/assets/css/style.css": "assets/css/style.css"
				}
			}
		},

		uglify: {
			dist: {
				files: [
					{
						expand: true,
						src: [
							'app/**/*.js',
							'lib/requirejs/*.js',
							'lib/CanJS/amd/**/*.js',
							'lib/requirejs-canjs-templates/stache.js',
							'lib/text/text.js'
						],
						dest: 'dist/'
					}
				]
			}
		},
		jasmine:{
			global:{
				options:{
					specs:'specs/*Spec.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions:{
						requireConfigFile: 'app/config.js'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['less']);

	grunt.registerTask('build', ['less', 'copy', 'uglify', 'cssmin']);
};