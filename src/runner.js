import lodash from 'lodash';
import glob from 'glob';
import { isEmptyFile, trimNewlines } from './utils';
import {extractTestsFromString, getDescriptionsFromFiles} from './parser';

/* eslint-disable */ /* jshint ignore:start */
import { should } from 'chai';
/* jshint ignore:end */ /* eslint-enable */

export function forEachAssertion(assertions, callback) {
  const mapAssertionFromAssertions = extractTestsFromString(
    trimNewlines(assertions)
  );
  const flatten = lodash.flatten(mapAssertionFromAssertions);

  lodash.each(flatten, callback);
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
  const testFiles = lodash.reject(
    glob.sync(config.testDirPath + '/**/*.styl'),
    isEmptyFile
  );

  lodash.each(
    lodash.flatten(
      lodash.map(testFiles, getDescriptionsFromFiles)
    ),
    callback
  );
}

/**
 * Run stylus tests by mocha.
 *
 * @param  {Array} config
 *
 * @return {[type]}
 */
export default function(config) {
  forEachTest(config, function(description) {
    // sets up describe
    describe(description.title, function() {
      forEachAssertion(description.assertions, function(test) {
        it(test.assertion, function() {
          test.run(config);
        });
      });
    });
  });
}
