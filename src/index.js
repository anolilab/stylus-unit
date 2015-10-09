import Mocha from 'mocha';
import fs from 'fs';
import lodash from 'lodash';

/**
 * Get description from package.json.
 *
 * @summary  Read the users npm package name property to provide a name for
 *           the test suite's initial 'describe'
 *
 *  @returns  <String>  '' || 'some-package-name'
 */
function getDefaultTestDescription() {
  let packageName;

  try {
    packageName = JSON.parse(fs.readFileSync('./package.json')).name;
  } catch (err) {
    packageName = '';
  }

  return packageName;
}

/**
 * Run Mocha with stylus runner.
 *
 * @param customConfig:
 */
export default function(customConfig) {
  // describe    <String>  Title used by Mocha top-level describe function
  // testDirPath <String>  the path where your styl tests are
  // stylus      <Object>  stylus config
  // mocha       <Object>  mocha config

  const defaultConfig = {
    describe: getDefaultTestDescription(),
    testDirPath: './tests',
    stylus: {
      compress: true,
    },
    mocha: {
      reporter: 'spec',
    },
  };

  // global config will be used by runner
  // for configing stylus compiler and test description / suite path
  root.config = lodash.merge(defaultConfig, customConfig);

  new Mocha(config.mocha)
  .addFile(__dirname + '/runner')
  .run(function(failures) {
    process.on('exit', function() {
      process.exit(failures);
    });
  });
}
