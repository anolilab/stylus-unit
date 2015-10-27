'use strict';

var rewire = require('rewire');
var lodash = require('lodash');
var assert = require('chai').assert;
var utils  = rewire('../specs/parser');

describe('#parser', function() {
  describe('getFileContent', function() {
    it('get file from path', function() {
      assert.equal(
        utils.__get__('getFileContent')(
          './tests/fixture/textFile.txt'
        ),
        'dasdada'
      );
    });
  });

  describe('extractTestFromString', function() {
    it('check if get a object back with our test infos', function() {
      var file = utils.__get__('getFileContent')(
        './tests/fixture/stylus-test-file.styl'
      );
      var extractTestFromString = utils.__get__('extractTestFromString');
      var obj = extractTestFromString(file);

      assert.equal(lodash.isObject(obj), true);
      assert.equal('description' in obj, true);
      assert.equal('givenStylus' in obj, true);
      assert.equal('expectedCss' in obj, true);
    });
  });

  describe('extractTestsFromString', function() {
    it('check if get a array of objects', function() {
      var file = utils.__get__('getFileContent')(
        './tests/fixture/stylus-2-test-file.styl'
      );
      var extractTestsFromString = utils.__get__('extractTestsFromString');
      var arr = extractTestsFromString(file);

      console.log(arr);

      assert.equal(lodash.isArray(arr), true);
      assert.equal(lodash.isObject(arr[0]), true);
    });
  });
});
