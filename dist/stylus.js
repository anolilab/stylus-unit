'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Stylus = require('Stylus');

var _Stylus2 = _interopRequireDefault(_Stylus);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

function arrayify(it) {
  return _lodash2['default'].isArray(it) ? it : [it];
}

function styl(string, config) {
  // First through the whole config at stylus,
  // it should ignore stuff it cannot handle
  // like use/import/include etc?
  var thisStylus = _Stylus2['default'](string, config);

  // Enumerate over the config options that the
  // stylus API only makes available by methods
  _lodash2['default'].each(['use', 'import', 'include'], function (option) {
    if (config[option]) {
      _lodash2['default'].each(arrayify(config[option]), thisStylus[option], thisStylus);
    }
  });

  return thisStylus;
}

exports['default'] = function (stylusCode, config, callback) {
  styl(stylusCode, config).render(function (err, cssFromStylus) {
    if (err) {
      throw err;
    }

    callback(_cleanCss2['default'].process(cssFromStylus));
  });
};

module.exports = exports['default'];