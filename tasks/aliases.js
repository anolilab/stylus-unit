module.exports = {
  'test': [
    'jsonlint:dev',
    'jscs:dev',
    'jshint:dev',
    'eslint:dev',
    'babel:test',
    'copy:test',
    'mochacli'
  ],
  'default': [
    'clean',
    'test',
    'babel:dist',
    'copy:dist'
  ]
};
