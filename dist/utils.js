'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.trim = trim;
exports.trimNewlines = trimNewlines;
exports.isEmpty = isEmpty;
exports.isEmptyFile = isEmptyFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

//  whitespace mutation utils

function trim(string) {
  return string.trim();
}

function trimNewlines(string) {
  return string.replace(/^(\s*|\n*)|(\s*|\n*)$/g, '');
}

//  string utils

function isEmpty(string) {
  return !string.length;
}

function isEmptyFile(filePath) {
  return isEmpty(trimNewlines(_fs2['default'].readFileSync(filePath, 'utf8')));
}
