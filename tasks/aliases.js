module.exports = {
  'test': [
    'jsonlint:dev',
    'jscs:dev',
    'jshint:dev',
    'eslint:dev'
  ],
  'default': [
    'test',
    'babel:dist'
  ]
};
