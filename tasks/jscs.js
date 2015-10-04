'use strict';
//jscs config

module.exports = {
  dev: {
    src: [
      'Gruntfile.js',
      'src/**/*.js',
      'tests/**/*.js'
    ],
    options: {
      config: '.jscsrc',
      fix: true
    },
  }
};
