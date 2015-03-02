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
    name: 'Aquarium'
  };

  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        livereload: true
      },
      livereload: {
        files: [
          'app/*.html',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'app/manifest.json'
        ]
      }
    },

    // Use grunt-shell to execute nw
    shell: {
      nw: {
        command: 'npm start'
      }
    },

    // Run nw and watch for changes concurrently
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      all: [
        'shell:nw',
        'watch'
      ]
    },

    // Builds the nw.js native apps
    nodewebkit: {
      options: {
        appName: 'app',
        version: '0.8.6',
        platforms: [/*'win',*/ 'osx32', 'linux'],
        buildDir: './build'  // Where the build version of your nw.js app is saved
      },
      src: ['./app/**/*']  // Your node-webkit app
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
      }
    }
  });

  grunt.registerTask('debug', [
    'concurrent:all'
  ]);

  grunt.registerTask('test', [
    // TODO: run tests
  ]);

  grunt.registerTask('build', [
    // Build the native app
    'nodewebkit',

    // Compress executables for distribution
    'compress'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
