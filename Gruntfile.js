'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths
  var config = {
    name: 'Aquarium',
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    // Project settings
    config: config,

    jshint: {
      options: {
        jshintrc: true,  // use config from .jshintrc
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*'
          ]
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        // If using bower:
        // includePaths: '<%= config.app %>/bower_components',
        imagePath: '<%= config.app %>/images',
        sourceMap: true
      },
      all: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles/',
          src: ['**/*.scss'],
          dest: '<%= config.app %>/styles/',
          ext: '.css'
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/index.html'
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'package.json',
            'node_modules/**',
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,gif}',
            '{,*/}*.html',
            'styles/{,*/}*.css',
            'styles/fonts/{,*/}*.*',
            '_locales/{,*/}*.json'
          ]
        }]
      }
    },

    // Builds the nw.js native apps
    nodewebkit: {
      options: {
        appName: 'app',
        platforms: ['win', 'osx', 'linux'],
        buildDir: './build'  // Where the build version of your nw.js app is saved
      },
      src: ['./dist/**/*']  // Your node-webkit app
    },

    compress: {
      options: { pretty: true },
      linux32: {
        options: {
          archive: 'build/compressed/linux32.zip'
        },
        expand: true,
        cwd: 'build/app/',
        src: ['linux32/**'],
        dest: ''
      },
      linux64: {
        options: {
          archive: 'build/compressed/linux64.zip'
        },
        expand: true,
        cwd: 'build/app/',
        src: ['linux64/**'],
        dest: ''
      },
      osx32: {
        options: {
          archive: 'build/compressed/osx32.zip'
        },
        expand: true,
        cwd: 'build/app/',
        src: ['osx32/**'],
        dest: ''
      },
      osx64: {
        options: {
          archive: 'build/compressed/osx64.zip'
        },
        expand: true,
        cwd: 'build/app/',
        src: ['osx64/**'],
        dest: ''
      },
      win32: {
        options: {
          archive: 'build/compressed/win32.zip'
        },
        expand: true,
        cwd: 'build/app/',
        src: ['win32/**'],
        dest: ''
      },
      win64: {
        options: {
          archive: 'build/compressed/win64.zip'
        },
        expand: true,
        cwd: 'build/app/',
        src: ['win64/**'],
        dest: ''
      }
    }
  });

  grunt.registerTask('debug', [
    // TODO: run JSHint, sass, nw, and watch for changes
    // 'jshint',
    'sass',
    // 'watch'
  ]);

  grunt.registerTask('test', [
    // TODO: run tests
  ]);

  grunt.registerTask('build', [
    // Clear out dist/
    'clean',

    // Compile SCSS
    'sass',

    // Generate usemin subtasks
    'useminPrepare',

    // Execute usemin subtasks
    'concat:generated',  // Concatenate assets
    'cssmin:generated',  // Minify CSS
    'uglify:generated',  // Minify JS

    // Copy remaining files to dist/
    'copy',

    // Replace asset references with newly-minified assets
    'usemin',

    // Build the native app
    'nodewebkit',

    // Compress executables for distribution
    'compress'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
