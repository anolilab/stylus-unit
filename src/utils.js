import fs from 'fs';

// whitespace mutation utils
export function trim(string) {
  return string.trim();
}

// remove all new lines
export function trimNewlines(string) {
  return string.replace(/^(\s*|\n*)|(\s*|\n*)$/g, '');
}

// string utils
export function isEmpty(string) {
  return !string.length;
}

// check if file is empty
export function isEmptyFile(filePath) {
  return isEmpty(trimNewlines(fs.readFileSync(filePath, 'utf8')));
}
