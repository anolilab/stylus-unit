'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _utils = require('./utils');

var _stylus = require('./stylus');

var _stylus2 = _interopRequireDefault(_stylus);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

/* eslint-disable */ /* jshint ignore:start */

var _chai = require('chai');

/* jshint ignore:end */ /* eslint-enable */

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

  _lodash2['default'].each(_lodash2['default'].flatten(_lodash2['default'].map(testFiles, _parser2['default'])), callback);
}

/**
 * Run stylus tests by mocha.
 *
 * @param  {Array} config
 *
 * @return {[type]}
 */

exports['default'] = function (config) {
  describe(config.describe, function () {
    forEachTest(config, function (test) {
      it(test.description, function () {
        _stylus2['default'](test.givenStylus, config.stylus, function (actualCss) {
          actualCss.should.equal(test.expectedCss);
        });
      });
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=runner.js.map
