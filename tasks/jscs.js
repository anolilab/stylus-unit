'use strict';
//jscs config

module.exports = {
  dev: {
    src: [
      'Gruntfile.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    options: {
      config: '.jscsrc',
      fix: true
    },
  }
};
