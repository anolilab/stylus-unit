'use strict';
//babel config

module.exports = {
  options: {
    stage: 1,
    loose: ['all'],
    optional: ['runtime', 'es7.asyncFunctions']
  },
  dist: {
    options: {
      sourceMap: false
    },
    files: {
      'dist/index.js': 'src/index.js',
      'dist/runner.js': 'src/runner.js',
      'dist/stylus.js': 'src/stylus.js',
      'dist/utils.js': 'src/utils.js',
    }
  },
  test: {
    options: {
      sourceMap: true
    },
    files: {
      'tests/specs/index.js': 'src/index.js',
      'tests/specs/runner.js': 'src/runner.js',
      'tests/specs/stylus.js': 'src/stylus.js',
      'tests/specs/utils.js': 'src/utils.js',
    }
  }
};
