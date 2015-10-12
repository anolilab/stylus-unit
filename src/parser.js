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

/**
 * Extract @expect from test file content.
 *
 * @param  {Array} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  let test = content;

  const description = test.match(/describe\(([^)]+)\)/g);
  // const funcDescription = (typeof description[1] !== 'undefined') ?
  // description[1] :
  // undefined;

  test = test.replace(/describe\(([^)]+)\)/g, '');
  const stylusAndCss = test.split(/.*expect.*/).map(trimNewlines);
  test = test.replace(/.*/, '');

  return {
    description: description[0],
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
      string.split(/it\(([^)]+)\)\s/),
      isEmpty
    ),
    extractTestFromString
  );
}

/**
 * Return parsed content.
 *
 * @param  {String} file
 *
 * @return {Array}
 */
export default function(file) {
  extractTestsFromString(getFile(file));
}
