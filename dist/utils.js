'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.trim = trim;
exports.trimNewlines = trimNewlines;
exports.isEmpty = isEmpty;
exports.isEmptyFile = isEmptyFile;
exports.getMatches = getMatches;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * Trim string.
 *
 * @param  {String} string
 *
 * @return {String}
 */

function trim(string) {
  return string.trim();
}

/**
 * Remove all new lines.
 *
 * @param  {String} string
 *
 * @return {String}
 */

function trimNewlines(string) {
  return string.replace(/^(\s*|\n*)|(\s*|\n*)$/g, '');
}

/**
 * Check if string is empty.
 *
 * @param  {String}  string
 *
 * @return {Boolean}
 */

function isEmpty(string) {
  return !string.length;
}

/**
 * check if file is empty.
 *
 * @param  {String}  path
 *
 * @return {Boolean}
 */

function isEmptyFile(path) {
  return isEmpty(trimNewlines(_fs2['default'].readFileSync(path, 'utf8')));
}

/**
 * Get all matches from regex
 *
 * @param  {String} string
 * @param  {Regex} regex
 * @param  {Integers} capturing
 *
 * @return {Array}
 */

function getMatches(string, regex, capturing) {
  var index = capturing || 1; // default to the first capturing group
  var matches = [];
  var match = regex.exec(string);

  while (match !== null) {
    matches.push(match[index]);
    match = regex.exec(string);
  }

  return matches;
}
