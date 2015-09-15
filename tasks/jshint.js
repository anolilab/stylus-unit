'use strict';
// jshint config

module.exports = {
  dev: {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    src: [
      'Gruntfile.js',
      'src/**/*.js',
      'test/**/*.js'
    ]
  }
};
