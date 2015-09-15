'use strict';
//mochacli config

module.exports = {
  options: {
    require: ['should'],
    reporter: 'nyan',
    bail: true
  },
  all: ['tests/*.test.js']
};
