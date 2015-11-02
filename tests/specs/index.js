'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * Get description from package.json.
 *
 * @summary  Read the users npm package name property to provide a name for
 *           the test suite's initial 'describe'
 *
 *  @returns  <String>  '' || 'some-package-name'
 */
function getDefaultTestDescription() {
  var packageName = undefined;

  try {
    packageName = JSON.parse(_fs2['default'].readFileSync('./package.json')).name;
  } catch (err) {
    packageName = '';
  }

  return packageName;
}

/**
 * Run Mocha with stylus runner.
 *
 * @param customConfig:
 */

exports['default'] = function (customConfig) {
  // describe    <String>  Title used by Mocha top-level describe function
  // testDirPath <String>  the path where your styl tests are
  // stylus      <Object>  stylus config
  // mocha       <Object>  mocha config

  var defaultConfig = {
    describe: getDefaultTestDescription(),
    testDirPath: './tests',
    stylus: {
      compress: true
    },
    mocha: {
      reporter: 'spec'
    }
  };

  // global config will be used by runner
  // for configing stylus compiler and test description / suite path
  root.config = _lodash2['default'].merge(defaultConfig, customConfig);

  new _mocha2['default'](config.mocha).addFile(__dirname + '/runner').run(function (failures) {
    process.on('exit', function () {
      process.exit(failures);
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=index.js.map
