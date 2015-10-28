'use strict';

var assert = require('chai').assert;
var utils  = require('../specs/utils');

describe('#utils', function() {
  describe('trim', function() {
    it('whitespace mutation utils', function() {
      var string = '  your string   ';
      assert.equal(utils.trim(string), 'your string');
    });
  });

  describe('trimNewlines', function() {
    it('remove all new lines', function() {
      var string = 'Node \
is \
cool.';
      assert.equal(
        utils.trimNewlines(string),
        'Node is cool.'
      );
    });
  });

  describe('isEmpty', function() {
    it('check if string is empty', function() {
      var eString = '';
      assert.equal(utils.isEmpty(eString), true);

      var string = 'aaa';
      assert.equal(utils.isEmpty(string), false);
    });
  });

  describe('isEmptyFile', function() {
    it('check if string is empty', function() {
      assert.equal(utils.isEmptyFile('./tests/fixture/emptyFile.txt'), true);
      assert.equal(utils.isEmptyFile('./tests/fixture/textFile.txt'), false);
    });
  });
});
