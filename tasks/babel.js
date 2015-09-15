'use strict';
// babel config

module.exports = {
  options: {
    stage: 1,
    loose: ['all'],
    optional: ['runtime']
  },
  dist: {
    options: {
      sourceMap: true
    },
    files:  [{
      expand: true,
      cwd: 'src/',
      src: 'main.js',
      dest: 'dist/'
    }]
  }
};
