'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _utils = require('./utils');

var _stylus = require('./stylus');

var _stylus2 = _interopRequireDefault(_stylus);

/* eslint-disable */ /* jshint ignore:start */

var _chai = require('chai');

/* jshint ignore:end */ /* eslint-enable */

function extractTestFromString(testString) {
  var test = testString;

  var description = test.match(/.*/)[0];
  var stylusAndCss = test.split(/.*@expect.*/).map(_utils.trimNewlines);
  test = test.replace(/.*/, '');

  return {
    description: description,
    givenStylus: stylusAndCss[0],
    expectedCss: _cleanCss2['default'].process(stylusAndCss[1])
  };
}

function extractTestsFromString(string) {
  //  Filter empty strings out, it seems that the
  //  @it line leaves an empty string entry behind in the array
  return _lodash2['default'].map(_lodash2['default'].reject(string.split(/.*@it\s?/), _utils.isEmpty), extractTestFromString);
}

function getTestsFromFile(filePath) {
  var fileContents = (0, _utils.trimNewlines)(_fs2['default'].readFileSync(filePath, 'utf8'));

  return extractTestsFromString(fileContents);
}

function forEachTest(config, callback) {
  var testFiles = _lodash2['default'].reject(_glob2['default'].sync(config.testDirPath + '/**/*.styl'), _utils.isEmptyFile);

  _lodash2['default'].each(_lodash2['default'].flatten(_lodash2['default'].map(testFiles, getTestsFromFile)), callback);
}

exports['default'] = function (config) {
  describe(config.describe, function () {
    forEachTest(config, function (test) {
      it(test.description, function () {
        (0, _stylus2['default'])(test.givenStylus, config.stylus, function (actualCss) {
          actualCss.should.equal(test.expectedCss);
        });
      });
    });
  });
};

module.exports = exports['default'];
