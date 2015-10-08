'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

function getFile(filePath) {
  var fileContents = _utils.trimNewlines(_fs2['default'].readFileSync(filePath, 'utf8'));

  return fileContents;
}

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

exports['default'] = function (file) {
  return extractTestsFromString(getFile(file));
};

module.exports = exports['default'];
//# sourceMappingURL=parser.js.map
