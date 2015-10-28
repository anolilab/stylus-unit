import fs from 'fs';
import CleanCSS from 'clean-css';

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

export function cleanCSS() {
  return new CleanCSS({
    advanced: false,
    aggressiveMerging: false,
  });
}
