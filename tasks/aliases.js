module.exports = {
  'dev:test' : [
    'newer:jsonlint:dev',
    'newer:jscs:dev',
    'newer:jshint:dev',
  ],
  'default': [
    'dev:test'
  ],
  'build': [
    'bump',
    'default'
  ]
};
