'use strict';

var rewire = require('rewire');
var assert = require('chai').assert;
var utils  = rewire('../specs/parser');

describe('#parser:getFile', function() {
  it('get file from path', function() {
    assert.equal(utils.__get__('getFile')('./tests/fixture/textFile.txt'), 'dasdada');
  });
});

describe('#parser:extractTestFromString', function() {
  it('get file from path', function() {
    var extractTestFromString = utils.__get__('extractTestFromString');
    // assert.equal(extractTestFromString('./tests/fixture/textFile.txt'), 'dasdada');
  });
});
