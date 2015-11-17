'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachAssertion = forEachAssertion;

exports.default = function (config) {
  forEachTest(config, function (description) {
    // sets up describe
    describe(description.module, function () {
      describe(description.title, function () {
        // run through each description
        // get test from @it and @expect
        // add to array
        // pass each array item through the it callback function
        forEachAssertion(description.assertions, function (test) {
          it(test.assertion, function () {
            test.run(config);
          });
        });
      });
    });
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _utils = require('./utils');

var _parser = require('./parser');

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* jshint ignore:end */ /* eslint-enable */

function forEachAssertion(assertions, callback) {
  var mapAssertionFromAssertions = (0, _parser.extractTestsFromString)((0, _utils.trimNewlines)(assertions));
  var flatten = _lodash2.default.flatten(mapAssertionFromAssertions);

  _lodash2.default.each(flatten, callback);
}

/**
 * Search for all tests.
 *
 * @param  {Array}    config
 * @param  {Function} callback
 *
 * @return {[type]}
 */

/* eslint-disable */ /* jshint ignore:start */
function forEachTest(config, callback) {
  var testFiles = _lodash2.default.reject(_glob2.default.sync(config.testDirPath + '/**/*.styl'), _utils.isEmptyFile);

  _lodash2.default.each(_lodash2.default.flatten(_lodash2.default.map(testFiles, _parser.getDescriptionsFromFiles)), callback);
}

/**
 * Run stylus tests by mocha.
 *
 * @param  {Array} config
 *
 * @return {[type]}
 */
