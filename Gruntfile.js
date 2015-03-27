'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Run nw and watch for changes concurrently
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: [
        'shell:nw',
        'watch'
      ],
      test: [
        'shell:launchSelenium',
        'testThenQuit'
      ]
    },

    // Scan code for style violations
    eslint: {
      all: ['app/{js,test}/**/*.{js,jsx}']
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      eslint: {
        files: ['app/{js,test}/**/*.{js,jsx}'],
        tasks: ['eslint:all']
      }
    },

    // Run mocha tests
    mochaTest: {
      test: {
        src: ['app/test/**.*'],
        options: {
          require: 'babel/register',
          timeout: 30000
        }
      }
    },

    // Run commands in the shell
    shell: {
      nw: {
        command: 'npm start'
      },
      prepareTestEnvironment: {
        command: './prepare_test_environment.sh'
      },
      launchSelenium: {
        command: 'java -jar ./tmp/selenium.jar -Dwebdriver.chrome.driver=./tmp/chromedriver2_server'
      },
      quitSelenium: {
        command: 'curl --fail --silent -X GET http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer; exit 0'
      }
    },

    // Builds the nw.js native apps
    nodewebkit: {
      options: {
        appName: 'app',
        version: '0.12.0',
        platforms: [/*'win',*/ 'osx', 'linux'],
        buildDir: './build'
      },
      src: ['./app/**/*']
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
      }
    }

  });

  // Execute mocha tests, then quit selenium
  grunt.registerTask('testThenQuit', [
    'mochaTest',
    'shell:quitSelenium'
  ]);

  grunt.registerTask('debug', [
    // Lint code
    'eslint',

    // Run node-webkit while linting files as they change
    'concurrent:dev'
  ]);

  grunt.registerTask('test', [
    'shell:prepareTestEnvironment',

    // Execute tests
    'concurrent:test'
  ]);

  grunt.registerTask('build', [
    // Build the native app
    'nodewebkit',

    // Compress executables for distribution
    'compress'
  ]);

  grunt.registerTask('default', [
    // Lint code
    'eslint',

    // Test
    'test',

    // Build distributable binaries
    'build'
  ]);
};
