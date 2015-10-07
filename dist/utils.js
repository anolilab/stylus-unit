'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.trim = trim;
exports.trimNewlines = trimNewlines;
exports.isEmpty = isEmpty;
exports.isEmptyFile = isEmptyFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

// whitespace mutation utils

function trim(string) {
  return string.trim();
}

// remove all new lines

function trimNewlines(string) {
  return string.replace(/^(\s*|\n*)|(\s*|\n*)$/g, '');
}

// string utils

function isEmpty(string) {
  return !string.length;
}

// check if file is empty

function isEmptyFile(filePath) {
  return isEmpty(trimNewlines(_fs2['default'].readFileSync(filePath, 'utf8')));
}
