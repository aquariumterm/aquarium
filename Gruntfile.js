'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        nodewebkit: {
            options: {
                platforms: ['win','osx', 'linux'],
                buildDir: './build'  // Where the build version of your nw.js app is saved
            },
            src: ['./app/**/*']  // Your node-webkit app
        }
    });

    grunt.registerTask('build', ['nodewebkit']);
};
