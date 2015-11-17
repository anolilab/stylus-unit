'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trim = trim;
exports.trimNewlines = trimNewlines;
exports.isEmpty = isEmpty;
exports.isEmptyFile = isEmptyFile;
exports.cleanCssMinify = cleanCssMinify;
exports.getFileContent = getFileContent;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return isEmpty(trimNewlines(_fs2.default.readFileSync(path, 'utf8')));
}

/**
 * [cleanCSS description]
 *
 * @return {CleanCSS}
 */
function cleanCssMinify(source) {
  var minify = new _cleanCss2.default({
    advanced: false,
    aggressiveMerging: false
  }).minify(source).styles;

  return minify;
}

/**
 * Get file content from path.
 *
 * @param  {String} path
 *
 * @return {String}
 */
function getFileContent(path) {
  var fileContents = trimNewlines(_fs2.default.readFileSync(path, 'utf8'));

  return fileContents;
}
