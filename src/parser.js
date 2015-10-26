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
function getFile(path) {
  const fileContents = trimNewlines(fs.readFileSync(path, 'utf8'));

  return fileContents;
}

function extractDescriptionFromString(string) {
  if (string.match(/.*/)[0].indexOf('@it') > 0) {
    string = 'no description found \n' + string;
  }

  const  title = string.match(/.*/)[0];
  const assertions = string.replace(/.*/, '');

  return {
    title: title,
    assertions: assertions,
  };
}

function extractDescriptionsFromString(string) {
  var approved = lodash.reject(string.split(/.*@describe\s?/), isEmpty);

  return lodash.map(approved, extractDescriptionFromString);
}

function getDescriptionsFromFiles(filePath) {
  return extractDescriptionsFromString(getFile(filePath));
}

/**
 * Extract @expect from test file content.
 *
 * @param  {Array} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  const regex = /describe\('([^\)]+)'\)/;
  let test = content;
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
function extractTestsFromString(string) {
  // Filter empty strings out, it seems that the
  // @it line leaves an empty string entry behind in the array
  return lodash.map(
    lodash.reject(
      string.split(/it\('([^\)]+)'\)\s?/gmi),
      isEmpty
    ),
    extractTestFromString
  );
}

export default function (assertions, callback) {
  const mapAssertionFromAssertions = extractTestsFromString(
    trimNewlines(assertions)
  );
  const flatten = lodash.flatten(mapAssertionFromAssertions);

  lodash.each(flatten, callback);
}
