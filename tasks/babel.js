'use strict';
//babel config

module.exports = {
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
      stage: 1,
      loose: ['all'],
      optional: ['runtime'],
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
