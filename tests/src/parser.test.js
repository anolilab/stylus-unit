'use strict';

var rewire = require('rewire');
var lodash = require('lodash');
var assert = require('chai').assert;
var expect = require('chai').expect;
var utils  = require('../specs/utils');
var parser = rewire('../specs/parser');

describe('#parser', function() {
  describe('extractDescriptionsFromString', function() {
    it('should throw a error, if module function dont exist', function() {
      var file = utils.getFileContent(
        './tests/fixture/stylus-test-removed-module-file.styl'
      );
      var extractDescriptionsFromString = parser.__get__('extractDescriptionsFromString');

      expect(extractDescriptionsFromString.bind(null, file)).to.throw(ReferenceError);
    });


    it('check if get a descriptions array back', function() {
      var file = utils.getFileContent(
        './tests/fixture/stylus-2-test-file.styl'
      );
      var extractDescriptionsFromString = parser.__get__('extractDescriptionsFromString');
      var arr = extractDescriptionsFromString(file);

      assert.equal(lodash.isArray(arr), true);
      assert.equal(lodash.isObject(arr[0]), true);
      assert.equal('assertions' in arr[0], true);
      assert.equal('title' in arr[0], true);
      assert.equal('module' in arr[0], true);
    });
  });

  describe('extractDescriptionFromString', function() {
    it('check if get a description array back', function() {
      var file = utils.getFileContent(
        './tests/fixture/stylus-test-file.styl'
      );
      var extractDescriptionFromString = parser.__get__('extractDescriptionFromString');
      var arr = extractDescriptionFromString(file);

      assert.equal(lodash.isObject(arr), true);
    });
  });

  describe('extractTestFromString', function() {
    it('check if get a empty object back', function() {
      var file = utils.getFileContent(
        './tests/fixture/stylus-test-fail-file.styl'
      );
      var extractTestFromString = parser.__get__('extractTestFromString');
      var obj = extractTestFromString(file);

      assert.equal(lodash.isObject(obj), true);
    });

    it('check if we get a expect object back, with our test infos', function() {
      var file = utils.getFileContent(
        './tests/fixture/stylus-test-file.styl'
      );
      var extractTestFromString = parser.__get__('extractTestFromString');
      var obj = extractTestFromString(file);

      assert.equal(lodash.isObject(obj), true);
      assert.equal('assertion' in obj, true);
      assert.equal('run' in obj, true);
      assert.equal(obj.type, 'expect');
    });

    it('check if we get a throw object back, with our test infos', function() {
      var file = utils.getFileContent(
        './tests/fixture/stylus-test-throw-file.styl'
      );
      var extractTestFromString = parser.__get__('extractTestFromString');
      var obj = extractTestFromString(file);

      assert.equal(lodash.isObject(obj), true);
      assert.equal('assertion' in obj, true);
      assert.equal('run' in obj, true);
      assert.equal(obj.type, 'throws');
    });
  });

  describe('extractTestsFromString', function() {
    // it('check if get a array of objects', function() {
    //   var file = utils.getFileContent(
    //     './tests/fixture/stylus-2-test-file.styl'
    //   );
    //   var extractTestsFromString = parser.__get__('extractTestsFromString');
    //   var arr = extractTestsFromString(file);

    //   console.log(arr);

    //   assert.equal(lodash.isArray(arr), true);
    //   assert.equal(lodash.isObject(arr[0]), true);
    // });
  });
});
