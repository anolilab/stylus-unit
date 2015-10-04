'use strict';
//mochacli config

module.exports = {
  options: {
    require: ['should'],
    reporter: 'spec',
    bail: true
  },
  all: ['tests/**/*.test.js']
};
