'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (stylusCode, config, callback) {
  styl(stylusCode, config).render(function (err, cssFromStylus) {
    if (err) {
      throw err;
    }

    callback(new _cleanCss2.default().minify(cssFromStylus).styles);
  });
};

var _stylus = require('stylus');

var _stylus2 = _interopRequireDefault(_stylus);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Arrayify.
 *
 * @param  {Array|String|Object} it
 *
 * @return {Bool}
 */
function arrayify(it) {
  return _lodash2.default.isArray(it) ? it : [it];
}

/**
 * Setup for Stylus.
 *
 * @param  {String} string
 * @param  {Object} config
 *
 * @return {Stylus}
 */
function styl(string, config) {
  // First through the whole config at stylus,
  // it should ignore stuff it cannot handle
  // like use/import/include etc?
  var thisStylus = (0, _stylus2.default)(string, config);

  // Enumerate over the config options that the
  // stylus API only makes available by methods
  _lodash2.default.each(['use', 'import', 'include'], function (option) {
    if (config[option]) {
      _lodash2.default.each(arrayify(config[option]), thisStylus[option], thisStylus);
    }
  });

  thisStylus.import(__dirname + '/stylus/unit');

  // Allow to define global variables/functions from JS
  if (config.define) {
    _lodash2.default.each(config.define, function (val, key) {
      thisStylus.define(key, val);
    });
  }

  return thisStylus;
}

/**
 * Render styl files.
 *
 * @param  {String}   stylusCode
 * @param  {Object}   config
 * @param  {Function} callback
 */
