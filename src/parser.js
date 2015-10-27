import fs from 'fs';
import CleanCSS from 'clean-css';
import lodash from 'lodash';
import { trimNewlines, isEmpty } from './utils';

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
  const approved = lodash.reject(string.split(/.*@describe\s?/), isEmpty);

  return lodash.map(approved, extractDescriptionFromString);
}

/**
 * Extract @expect from test file content.
 *
 * @param  {Array} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  let test = content;
  const regex = /describe\('([^\)]+)'\)/;
  const descriptions = regex.exec(test);

  test = test.replace(regex, '');
  const stylusAndCss = test.split(/.*expect.*/i).map(trimNewlines);
  test = test.replace(/.*/, '');

  return {
    description: descriptions[1],
    givenStylus: stylusAndCss[0],
    expectedCss: new CleanCSS().minify(stylusAndCss[1]).styles,
  };
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
