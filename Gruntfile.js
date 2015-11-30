'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015'],
      },
      dist: {
        files: {
          'lib/bforest.js': 'src/bforest.js',
        },
      },
    },
    jshint: {
      all: {
        src: ['./*.js', './test/**/*_test.js'],
        options: {
          curly: true,
          eqeqeq: true,
          expr: true,
          mocha: true,
          node: true,
          strict: true,
          undef: true,
          unused: true,
        },
      },
    },
    jscs: {
      all: {
        src: ['./*.js', './test/**/*_test.js'],
        options: {
          config: '.jscsrc',
          verbose: true,
        },
      },
    },
    simplemocha: {
      all: {
        src: ['./test/**/*_test.js'],
      },
    },
    watch: {
      files: ['./*.js', './test/**/*_test.js'],
      tasks: ['lint', 'test'],
    },
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('build', 'babel');
  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('test', ['lint', 'simplemocha']);

  grunt.registerTask('default', ['build', 'test']);
};
