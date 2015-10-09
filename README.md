# stylus-unit

[![Author](http://img.shields.io/badge/author-@anolilab-blue.svg?style=flat-square)](https://twitter.com/anolilab)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

## Releases
[![npm](https://img.shields.io/npm/v/stylus-unit.svg?style=flat-square)](https://www.npmjs.com/package/stylus-unit)
[![GitHub release](https://img.shields.io/github/release/anolilab/stylus-unit.svg?style=flat-square)](https://github.com/anolilab/stylus-unit/releases)

## Dependencies
[![devDependency Status](https://david-dm.org/anolilab/stylus-unit/dev-status.svg?style=flat-square)](https://david-dm.org/anolilab/stylus-unit#info=devDependencies)
[![Dependency Status](https://david-dm.org/anolilab/stylus-unit.svg?style=flat-square)](https://david-dm.org/anolilab/stylus-unit#info=dependencies&view=table)

## 1.0.0
[![Build Status](https://img.shields.io/travis/anolilab/stylus-unit/branch=1.0.0.svg?style=flat-square)](https://travis-ci.org/anolilab/stylus-unit)

## Master
[![Build Status](https://img.shields.io/travis/anolilab/stylus-unit/master.svg?style=flat-square)](https://travis-ci.org/anolilab/stylus-unit)

### Bits and Pieces:
* [npm:](https://npmjs.org/) Well... it's a Node.js package manager
* [Grunt:](http://gruntjs.com/) Automates common tasks: test, build, clean
* [Babel:](https://github.com/babel/babel/) Use next generation JavaScript, today.

## Getting Started:

1. You need to have npm installed (it comes with node)
2. Clone this repository: `git clone git@github.com:anolilab/stylus-unit.git`
3. Install dependencies: `npm install`

## Install

~~~
npm i stylus-unit --save-dev
~~~

## Usage

~~~js
var unit = require('stylus-unit');
var config = {
  describe: 'your describe',
  testDirPath: 'path/to/your/tests',
  stylus: {
    import: 'path/to/your/stylus/file'
  }
}

unit(config);
~~~

## Settings

~~~
// Title used by Mocha top-level describe function
describe: ''

// The path where your styl tests are
testDirPath: ''

// Stylus config
stylus : {

}

// Mocha config
// Support for all Mocha [options](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options)
mocha: {

}
~~~

## Preview

~~~
// @describe Utils
// @describe amcss
// @it should output amcss for a given properties
  am(module)
    color: red;
  am(module, blue)
    color: blue;
  am(module, large)
    font-size: 2em;

// @expect
  [ui-module] {
    color: red;
  }
  [ui-module~="blue"] {
    color: blue;
  }
  [ui-module~="large"] {
    font-size: 2em;
  }

$ make test
 Utils
    ✓ should output amcss for a given properties (69ms)
~~~

## Plugins

### Grunt
[grunt-stylus-unit](https://github.com/anolilab/grunt-stylus-unit)
### Gulp
[gulp-stylus-unit](https://github.com/anolilab/gulp-stylus-unit)

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

~~~
grunt test
~~~

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Credits

- [Daniel Bannert](https://github.com/prisis)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
