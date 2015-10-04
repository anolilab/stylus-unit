'use strict';
//bump config

module.exports = {
  options: {
    files: ['package.json'],
    updateConfigs: [],
    commit: false,
    createTag: false,
    push: false,
    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
    globalReplace: false,
    prereleaseName: false,
    regExp: false
  }
};
