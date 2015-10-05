module.exports = {
  'test': [
    'jsonlint:dev',
    'jscs:dev',
    'jshint:dev',
    'eslint:dev',
    'babel:test'
  ],
  'default': [
    'clean',
    'test',
    'babel:dist'
  ]
};
