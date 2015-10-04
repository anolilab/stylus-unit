import stylus from 'Stylus';
import _ from 'lodash';
import cleanCSS from 'clean-css';

function arrayify(it) {
  return _.isArray(it) ? it : [it];
}

function styl(string, config) {
  // First through the whole config at stylus,
  // it should ignore stuff it cannot handle
  // like use/import/include etc?
  const thisStylus = stylus(string, config);

  // Enumerate over the config options that the
  // stylus API only makes available by methods
  _.each(['use', 'import', 'include'], function(option) {
    if (config[option]) {
      _.each(arrayify(config[option]), thisStylus[option], thisStylus);
    }
  });

  return thisStylus;
}

export default function (stylusCode, config, callback) {
  styl(stylusCode, config)
  .render(function(err, cssFromStylus) {
    if (err) {
      throw err;
    }

    callback(cleanCSS.process(cssFromStylus));
  });
}
