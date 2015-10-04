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
      sourceMap: true
    },
    files: {
      'dist/index.js': 'src/index.js',
      'dist/runner.js': 'src/runner.js',
      'dist/stylus.js': 'src/stylus.js',
      'dist/utils.js': 'src/utils.js',
    }
  }
};
