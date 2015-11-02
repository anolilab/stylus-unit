'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.extractTestsFromString = extractTestsFromString;
exports.getDescriptionsFromFiles = getDescriptionsFromFiles;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chai = require('chai');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _stylus = require('./stylus');

var _stylus2 = _interopRequireDefault(_stylus);

/**
 * Get file content from path.
 *
 * @param  {String} path
 *
 * @return {String}
 */
function getFileContent(path) {
  var fileContents = _utils.trimNewlines(_fs2['default'].readFileSync(path, 'utf8'));

  return fileContents;
}

/**
 * Extract description and title from string.
 *
 * @param  {String} string
 *
 * @return {Object}
 */
function extractDescriptionFromString(string) {
  var content = string;

  if (content.match(/.*/)[0].indexOf('it') > 0) {
    content = 'no description found \n' + content;
  }

  var title = content.match(/.*/)[0];
  var assertions = content.replace(/.*/, '');

  return {
    title: title,
    assertions: assertions
  };
}

/**
 * Extract descriptions from string.
 *
 * @param  {String} string
 *
 * @return {Array}
 */
function extractDescriptionsFromString(string) {
  var approved = _lodash2['default'].reject(string.split(/.*describe\('([^\)]+)'\)\s?/), _utils.isEmpty);

  return _lodash2['default'].map(approved, extractDescriptionFromString);
}

/**
 * Extract expect from test.
 *
 * @param  {String} string
 * @param  {String} assertion
 *
 * @return {Object}
 */
function extractExpect(string, assertion) {
  var content = string;
  var stylusAndCss = content.split(/.*expect\('([^\)]+)'\)/).map(_utils.trimNewlines);
  var expectedCss = _utils.cleanCSS.minify(stylusAndCss[1]).styles;

  return {
    assertion: assertion,
    run: function run(config) {
      _stylus2['default'](stylusAndCss[0], config.stylus, function (actualCss) {
        actualCss.should.equal(expectedCss);
      });
    }
  };
}

/**
 * Extract throws from test string.
 *
 * @param  {String} string
 * @param  {String} assertion
 *
 * @return {Object}
 */
function extractThrows(string, assertion) {
  var content = string;
  var stylus = content.split(/.*throws\('([^\)]+)'\)/).map(_utils.trimNewlines)[0];
  var error = /throws\s*(?:\/(.*)\/)?/.exec(content)[1];

  if (typeof error !== 'undefined') {
    error = new RegExp(error);
  }

  return {
    assertion: assertion,
    run: function run(config) {
      _chai.assert.throws(function () {
        _stylus2['default'](stylus, config.stylus, function () {});
      }, error);
    }
  };
}

/**
 *
 * @param  {String} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  var string = content;
  var assertion = string.match(/.*/)[0];
  var test = string.replace(/.*/, '');

  if (test.match(/expect\('([^\)]+)'\)/)) {
    return extractExpect(test, assertion);
  } else if (test.match(/throws\('([^\)]+)'\)/)) {
    return extractThrows(test, assertion);
  }
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
  return _lodash2['default'].map(_lodash2['default'].reject(string.split(/.*it\('([^\)]+)'\)\s?/), _utils.isEmpty), extractTestFromString);
}

/**
 * [getDescriptionsFromFiles description]
 *
 * @param  {String} path
 *
 * @return {Array}
 */

function getDescriptionsFromFiles(path) {
  return extractDescriptionsFromString(getFileContent(path));
}
//# sourceMappingURL=parser.js.map
