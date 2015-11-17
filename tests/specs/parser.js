'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractTestsFromString = extractTestsFromString;
exports.getDescriptionsFromFiles = getDescriptionsFromFiles;

var _chai = require('chai');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _stylus = require('./stylus');

var _stylus2 = _interopRequireDefault(_stylus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extract description and title from string.
 *
 * @param  {String} string
 *
 * @return {Object}
 */
function extractDescriptionFromString(string) {
  var content = string;
  var describeRegex = /describe\('([^\)]+)'\)/;

  if (content.match(/.*/)[0].indexOf('it') > 0) {
    content = 'describe(' + 'no description found' + ')' + ' \n' + content;
  }

  var title = content.match(describeRegex)[1];
  var assertions = content.replace(describeRegex, '');

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
  var content = string;
  var regexModule = /module\('([^\)]+)'\)/;

  if (!regexModule.test(content)) {
    throw new ReferenceError('All test need a module("Module Name") function.');
  }

  var module = content.match(regexModule);
  content = content.replace(regexModule, '');
  var approved = _lodash2.default.reject(content.split(/describe\(\)\s?/), _utils.isEmpty);

  var map = _lodash2.default.map(approved, extractDescriptionFromString);
  map[0].module = module[1];

  return map;
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
  var stylusAndCss = content.split(/.*expect\(\)/).map(_utils.trimNewlines);
  var expectedCss = (0, _utils.cleanCssMinify)(stylusAndCss[1]);

  return {
    assertion: assertion,
    run: function run(config) {
      (0, _stylus2.default)(stylusAndCss[0], config.stylus, function (actualCss) {
        actualCss.should.equal(expectedCss);
      });
    },
    type: 'expect'
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
  var stylus = content.split(/.*throws/).map(_utils.trimNewlines)[0];
  var error = /throws\('([^\)]+)'\)/.exec(content)[1];

  if (typeof error !== 'undefined') {
    error = new RegExp(error);
  }

  return {
    assertion: assertion,
    run: function run(config) {
      _chai.assert.throws(function () {
        (0, _stylus2.default)(stylus, config.stylus, function () {});
      }, error);
    },
    type: 'throws'
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
  var assertion = string.match(/describe\('([^\)]+)'\)/)[1];
  var test = string.replace(/.*/, '');

  if (test.match(/.*expect/)) {
    return extractExpect(test, assertion);
  } else if (test.match(/.*throws/)) {
    return extractThrows(test, assertion);
  }

  return {};
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
  return _lodash2.default.map(_lodash2.default.reject(string.split(/.*it\('([^\)]+)'\)\s?/), _utils.isEmpty), extractTestFromString);
}

/**
 * [getDescriptionsFromFiles description]
 *
 * @param  {String} path
 *
 * @return {Array}
 */
function getDescriptionsFromFiles(path) {
  return extractDescriptionsFromString((0, _utils.getFileContent)(path));
}
//# sourceMappingURL=parser.js.map
