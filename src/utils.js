import fs from 'fs';

/**
 * Trim string.
 *
 * @param  {String} string
 *
 * @return {String}
 */
export function trim(string) {
  return string.trim();
}

/**
 * Remove all new lines.
 *
 * @param  {String} string
 *
 * @return {String}
 */
export function trimNewlines(string) {
  return string.replace(/^(\s*|\n*)|(\s*|\n*)$/g, '');
}

/**
 * Check if string is empty.
 *
 * @param  {String}  string
 *
 * @return {Boolean}
 */
export function isEmpty(string) {
  return !string.length;
}

/**
 * check if file is empty.
 *
 * @param  {String}  path
 *
 * @return {Boolean}
 */
export function isEmptyFile(path) {
  return isEmpty(trimNewlines(fs.readFileSync(path, 'utf8')));
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
export function getMatches(string, regex, capturing) {
  const index = capturing || 1; // default to the first capturing group
  const matches = [];
  let match = regex.exec(string);

  while (match !== null) {
    matches.push(match[index]);
    match = regex.exec(string);
  }

  return matches;
}
