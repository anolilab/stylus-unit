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

describe('#parser:getDescribe', function() {
  it('get describe', function() {
    var getDescribe = utils.__get__('getDescribe');
    var getFile = utils.__get__('getFile');
    var string = getFile('./tests/fixture/describe.styl');

    assert.equal(getDescribe(string, 0), 'test');
    assert.equal(getDescribe(string, 1), 'test2');
  });
});
