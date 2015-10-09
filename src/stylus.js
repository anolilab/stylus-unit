import stylus from 'stylus';
import lodash from 'lodash';
import CleanCSS from 'clean-css';

/**
 * Arrayify.
 *
 * @param  {Array|String|Object} it
 *
 * @return {Bool}
 */
function arrayify(it) {
  return lodash.isArray(it) ? it : [it];
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
  const thisStylus = stylus(string, config);

  // Enumerate over the config options that the
  // stylus API only makes available by methods
  lodash.each(['use', 'import', 'include'], function(option) {
    if (config[option]) {
      lodash.each(arrayify(config[option]), thisStylus[option], thisStylus);
    }
  });

  return thisStylus;
}

/**
 * Render styl files.
 *
 * @param  {String}   stylusCode
 * @param  {Object}   config
 * @param  {Function} callback
 */
export default function(stylusCode, config, callback) {
  styl(stylusCode, config)
  .render(function(err, cssFromStylus) {
    if (err) {
      throw err;
    }

    callback(new CleanCSS().minify(cssFromStylus).styles);
  });
}
