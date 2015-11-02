'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.forEachAssertion = forEachAssertion;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _utils = require('./utils');

var _parser = require('./parser');

/* eslint-disable */ /* jshint ignore:start */

var _chai = require('chai');

/* jshint ignore:end */ /* eslint-enable */

function forEachAssertion(assertions, callback) {
  var mapAssertionFromAssertions = _parser.extractTestsFromString(_utils.trimNewlines(assertions));
  var flatten = _lodash2['default'].flatten(mapAssertionFromAssertions);

  _lodash2['default'].each(flatten, callback);
}

/**
 * Search for all tests.
 *
 * @param  {Array}    config
 * @param  {Function} callback
 *
 * @return {[type]}
 */
function forEachTest(config, callback) {
  var testFiles = _lodash2['default'].reject(_glob2['default'].sync(config.testDirPath + '/**/*.styl'), _utils.isEmptyFile);

  _lodash2['default'].each(_lodash2['default'].flatten(_lodash2['default'].map(testFiles, _parser.getDescriptionsFromFiles)), callback);
}

/**
 * Run stylus tests by mocha.
 *
 * @param  {Array} config
 *
 * @return {[type]}
 */

exports['default'] = function (config) {
  forEachTest(config, function (description) {
    // sets up describe
    describe(description.title, function () {
      forEachAssertion(description.assertions, function (test) {
        it(test.assertion, function () {
          test.run(config);
        });
      });
    });
  });
};
//# sourceMappingURL=runner.js.map
