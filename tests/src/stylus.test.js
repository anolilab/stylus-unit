'use strict';

var rewire = require('rewire');
var assert = require('chai').assert;
var stylus  = rewire('../specs/stylus');

describe('#stylus', function() {
  describe('arrayify', function() {
    it('check if is a array, if not create one.', function() {
      assert.deepEqual(stylus.__get__('arrayify')(['string', 'test']), ['string', 'test']);
      assert.deepEqual(stylus.__get__('arrayify')('string'), ['string']);
      assert.deepEqual(stylus.__get__('arrayify')({'string': 'test'}), [{'string': 'test'}]);
    });
  });
});
