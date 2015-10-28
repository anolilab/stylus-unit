import fs from 'fs';
import lodash from 'lodash';
import { trimNewlines, isEmpty, cleanCSS } from './utils';
import stylusRenderer from './stylus';

/**
 * Get file content from path.
 *
 * @param  {String} path
 *
 * @return {String}
 */
function getFileContent(path) {
  const fileContents = trimNewlines(fs.readFileSync(path, 'utf8'));

  return fileContents;
}

/**
 * Extract description and title from string.
 *
 * @param  {String} string
 *
 * @return {Object}
 */
function extractDescriptionFromString(string) {
  let content = string;

  if (content.match(/.*/)[0].indexOf('it') > 0) {
    content = 'no description found \n' + content;
  }

  const title = content.match(/.*/)[0];
  const assertions = content.replace(/.*/, '');

  return {
    title: title,
    assertions: assertions,
  };
}

/**
 * Extract descriptions from string.
 *
 * @param  {String} string
 *
 * @return {Array}
 */
function extractDescriptionsFromString(string) {
  const approved = lodash.reject(
    string.split(/.*describe\('([^\)]+)'\)\s?/),
    isEmpty
  );

  return lodash.map(approved, extractDescriptionFromString);
}

/**
 *
 * @param  {String} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  let string = content;
  const assertion = string.match(/.*/)[0];
  let test        = string.replace(/.*/, '');

  if (test.match(/expect\('([^\)]+)'\)/)) {
    const stylusAndCss = test.split(/.*expect\('([^\)]+)'\)/).map(trimNewlines);
    const expectedCss = cleanCSS.minify(stylusAndCss[1]).styles;

    return {
      assertion: assertion,
      run: function (config) {
        stylusRenderer(stylusAndCss[0], config.stylus, function (actualCss) {
          actualCss.should.equal(expectedCss);
        });
      }
    };
  } else if (test.match(/throws\('([^\)]+)'\)/)) {
    const stylus = (test.split(/.*throws\('([^\)]+)'\)/).map(trimNewlines))[0];
    let error = (/throws\s*(?:\/(.*)\/)?/).exec(test)[1];

    if (typeof(error) !== 'undefined') {
      error = new RegExp(error);
    }

    return {
      assertion: assertion,
      run: function (config) {
        assert.throws(
          function () {
            stylusRenderer(stylus, config.stylus, function () {

            });
          },
          error
        );
      },
    };
  }
}

/**
 * Extract tests from string.
 *
 * @param  {String} string
 *
 * @return {Array}
 */
export function extractTestsFromString(string) {
  // Filter empty strings out, it seems that the
  // @it line leaves an empty string entry behind in the array
  return lodash.map(
    lodash.reject(
      string.split(/.*it\('([^\)]+)'\)\s?/),
      isEmpty
    ),
    extractTestFromString
  );
}

/**
 * [getDescriptionsFromFiles description]
 *
 * @param  {String} path
 *
 * @return {Array}
 */
export function getDescriptionsFromFiles(path) {
  return extractDescriptionsFromString(getFileContent(path));
}
