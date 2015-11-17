'use strict';

var rewire = require('rewire');
var assert = require('chai').assert;
var index  = rewire('../specs/index');
var run    = require('../specs/index');

describe('#index.js', function() {
  describe('getDefaultTestDescription', function() {
    it('get name from package.json', function() {
      assert.equal(index.__get__('getDefaultTestDescription')(), 'stylus-unit');
    });
  });

  describe('stylusRunner', function() {
    it('run a stylus test file.', function() {
      run.default({
        testDirPath: __dirname + '/stylus-tests',
      });
    });
  });
});
