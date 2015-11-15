import fs from 'fs';
import { assert } from 'chai';
import lodash from 'lodash';
import { trimNewlines, isEmpty, cleanCssMinify } from './utils';
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
  const describeRegex = /describe\('([^\)]+)'\)/;

  if (content.match(/.*/)[0].indexOf('it') > 0) {
    content = 'no description found \n' + content;
  }

  const title = content.match(describeRegex)[1];
  const assertions = content.replace(describeRegex, '');

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
  let content = string;
  const regexModule = /module\('([^\)]+)'\)/;

  if (!regexModule.test(content)) {
    throw new ReferenceError('All test need a module("Module Name") function.');
  }

  const module = content.match(regexModule);
  content = content.replace(regexModule, '');
  const approved = lodash.reject(
    content.split(/describe\(\)\s?/),
    isEmpty
  );

  const map = lodash.map(
    approved,
    extractDescriptionFromString
  );
  map[0].module = module[1];

  return map;
}

/**
 * Extract expect from test.
 *
 * @param  {String} string
 * @param  {String} assertion
 *
 * @return {Object}
 */
function extractExpect(string, assertion) {
  const content = string;
  const stylusAndCss = content.split(/.*expect\(\)/).map(
    trimNewlines
  );
  const expectedCss = cleanCssMinify(stylusAndCss[1]);

  return {
    assertion: assertion,
    run: function(config) {
      stylusRenderer(stylusAndCss[0], config.stylus, function(actualCss) {
        actualCss.should.equal(expectedCss);
      });
    },
    type: 'expect',
  };
}

/**
 * Extract throws from test string.
 *
 * @param  {String} string
 * @param  {String} assertion
 *
 * @return {Object}
 */
function extractThrows(string, assertion) {
  const content = string;
  const stylus = (content.split(/.*throws/).map(trimNewlines))[0];
  let error = (/throws\('([^\)]+)'\)/).exec(content)[1];

  if (typeof(error) !== 'undefined') {
    error = new RegExp(error);
  }

  return {
    assertion: assertion,
    run: function(config) {
      assert.throws(
        function() {
          stylusRenderer(stylus, config.stylus, function() {});
        },
        error
      );
    },
    type: 'throws',
  };
}

/**
 *
 * @param  {String} content
 *
 * @return {Object}
 */
function extractTestFromString(content) {
  const string = content;
  const assertion = string.match(/describe\('([^\)]+)'\)/)[1];
  const test = string.replace(/.*/, '');

  if (test.match(/.*expect/)) {
    return extractExpect(test, assertion);
  } else if (test.match(/.*throws/)) {
    return extractThrows(test, assertion);
  }

  return {};
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
