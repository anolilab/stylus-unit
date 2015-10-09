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

/**
 * Get file content from path.
 *
 * @param  {String} path
 *
 * @return {String}
 */
function getFile(path) {
  var fileContents = _utils.trimNewlines(_fs2['default'].readFileSync(path, 'utf8'));

  return fileContents;
}

/**
 * Extract @expect from test file content.
 *
 * @param  {Array} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  var test = content;

  var description = test.match(/.*/g)[0];
  var stylusAndCss = test.split(/.*@expect.*/).map(_utils.trimNewlines);
  test = test.replace(/.*/, '');

  return {
    description: description,
    givenStylus: stylusAndCss[0],
    expectedCss: new _cleanCss2['default']().minify(stylusAndCss[1]).styles
  };
}

/**
 * Extract tests from string.
 *
 * @param  {String} string
 *
 * @return {Array}
 */
function extractTestsFromString(string) {
  // Filter empty strings out, it seems that the
  // @it line leaves an empty string entry behind in the array
  return _lodash2['default'].map(_lodash2['default'].reject(string.split(/.*@it\s?/), _utils.isEmpty), extractTestFromString);
}

/**
 * Return parsed content.
 *
 * @param  {String} file
 *
 * @return {Array}
 */

exports['default'] = function (file) {
  extractTestsFromString(getFile(file));
};

module.exports = exports['default'];
//# sourceMappingURL=parser.js.map
