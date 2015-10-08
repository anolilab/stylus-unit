import fs from 'fs';
import cleanCSS from 'clean-css';
import lodash from 'lodash';
import { trimNewlines, isEmpty } from './utils';

function getFile(filePath) {
  const fileContents = trimNewlines(fs.readFileSync(filePath, 'utf8'));

  return fileContents;
}

function extractTestFromString(testString) {
  let test = testString;

  const description = test.match(/.*/)[0];
  const stylusAndCss = test.split(/.*@expect.*/).map(trimNewlines);
  test = test.replace(/.*/, '');

  return {
    description: description,
    givenStylus: stylusAndCss[0],
    expectedCss: cleanCSS.process(stylusAndCss[1]),
  };
}

function extractTestsFromString(string) {
  //  Filter empty strings out, it seems that the
  //  @it line leaves an empty string entry behind in the array
  return lodash.map(
    lodash.reject(
      string.split(/.*@it\s?/),
      isEmpty
    ),
    extractTestFromString
  );
}

function getDescribe(string, nummber) {
  const describe = string.match(/@describe.*/g).map(trimNewlines);

  if (describe[nummber] !== '') {
    return describe[nummber].replace('@describe ', '');
  }

  return '';
}

function extractMainDescribeFromTest(testString) {
  const describe = getDescribe(testString, 0);

}

function extractDescribeFromTest(string) {
  const describe = getDescribe(testString, 1);

}

export default function(file) {
  return extractTestsFromString(getFile(file));
}
