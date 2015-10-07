'use strict';
//mochacli config

module.exports = {
  options: {
    reporter: 'spec',
    bail: true
  },
  all: [
    'tests/**/*.test.js'
  ]
};
