'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    nodewebkit: {
      options: {
        platforms: ['win', 'osx', 'linux'],
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
        cwd: 'build/frosh/',
        src: ['linux32/**'],
        dest: ''
      },
      linux64: {
        options: {
          archive: 'build/compressed/linux64.zip'
        },
        expand: true,
        cwd: 'build/frosh/',
        src: ['linux64/**'],
        dest: ''
      },
      osx32: {
        options: {
          archive: 'build/compressed/osx32.zip'
        },
        expand: true,
        cwd: 'build/frosh/',
        src: ['osx32/**'],
        dest: ''
      },
      osx64: {
        options: {
          archive: 'build/compressed/osx64.zip'
        },
        expand: true,
        cwd: 'build/frosh/',
        src: ['osx64/**'],
        dest: ''
      },
      win32: {
        options: {
          archive: 'build/compressed/win32.zip'
        },
        expand: true,
        cwd: 'build/frosh/',
        src: ['win32/**'],
        dest: ''
      },
      win64: {
        options: {
          archive: 'build/compressed/win64.zip'
        },
        expand: true,
        cwd: 'build/frosh/',
        src: ['win64/**'],
        dest: ''
      }
    }
  });

  grunt.registerTask('build', [
    'nodewebkit',
    'compress'
  ]);
};
