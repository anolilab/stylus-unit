'use strict';
//jscs config

module.exports = {
  dev: {
    src: [
      'Gruntfile.js',
      'src/**/*.js',
      'tests/src/**/*.js'
    ],
    options: {
      config: '.jscsrc',
      fix: true
    },
  }
};
