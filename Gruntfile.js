/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    meta: {
            basePath: './',
            imagesPath: 'source/images',
            fontsPath: 'source/fonts',
            styleSrcPath: 'source/css',
            styleDeployPath: 'dist/css',
			sassSrcPath: 'source/sass',
            jsSrcPath: 'source/javascripts',
            jsDeployPath: 'dist/javascripts'
        },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= meta.jsSrcPath %>/bootstrap.js'],
        dest: '<%= meta.jsDeployPath %>/bootstrap.js'
      }
    },


    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= meta.jsSrcPath %>/bootstrap.js',
        dest: '<%= meta.jsDeployPath %>/bootstrap.min.js'
      }
    },


    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },


    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },


    compass: {                  // Task
	    dist: {                   // Target
	      options: {              // Target options
	        sassDir: 'source/sass',
	        cssDir: 'dist/css',
	        imagesDir: 'source/images',
	        javascriptsDir: 'source/javascripts',
	        fontsDir: 'source/fonts',
	        environment: 'development',
	        cssPath: 'dist/css'
	      }
	    }
	  }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'compass', 'concat', 'uglify']);

};
