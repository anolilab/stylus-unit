import fs from 'fs';
import cleanCSS from 'clean-css';
import _ from 'lodash';
import glob from 'glob';
import { trimNewlines, isEmpty, isEmptyFile } from './utils';
import stylusRenderer from './stylus';

/* eslint-disable */ /* jshint ignore:start */
import { should } from 'chai';
/* jshint ignore:end */ /* eslint-enable */

function extractTestFromString(test) {
  const description = test.match(/.*/)[0];
  const stylusAndCss = test.split(/.*@expect.*/).map(trimNewlines);
  test = test.replace(/.*/, '');

  return {
    description: description,
    givenStylus: stylusAndCss[0],
    expectedCss: cleanCSS.process(stylusAndCss[1])
  };
}

function extractTestsFromString(string) {
  //  Filter empty strings out, it seems that the
  //  @it line leaves an empty string entry behind in the array
  return _.map(
    _.reject(
      string.split(/.*@it\s?/),
      isEmpty
    ),
    extractTestFromString
  );
}

function getTestsFromFile(filePath) {
  const fileContents = trimNewlines(fs.readFileSync(filePath, 'utf8'));

  return extractTestsFromString(fileContents);
}

function forEachTest(config, callback) {
  const testFiles = _.reject(
    glob.sync(config.testDirPath + '/**/*.styl'),
    isEmptyFile
  );

  _.each(
    _.flatten(
      _.map(testFiles, getTestsFromFile)
    ),
    callback
  );
}

export default function (config) {
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
