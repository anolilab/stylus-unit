import lodash from 'lodash';
import glob from 'glob';
import { isEmptyFile } from './utils';
import stylusRenderer from './stylus';
import getTests from './parser';

/* eslint-disable */ /* jshint ignore:start */
import { should } from 'chai';
/* jshint ignore:end */ /* eslint-enable */

function forEachTest(config, callback) {
  const testFiles = lodash.reject(
    glob.sync(config.testDirPath + '/**/*.styl'),
    isEmptyFile
  );

  lodash.each(
    lodash.flatten(
      lodash.map(testFiles, getTests)
    ),
    callback
  );
}

export default function(config) {
  describe(config.describe, function() {
    forEachTest(config, function(test) {
      it(test.description, function() {
        stylusRenderer(
          test.givenStylus,
          config.stylus,
          function(actualCss) {
            actualCss.should.equal(test.expectedCss);
          }
        );
      });
    });
  });
}
