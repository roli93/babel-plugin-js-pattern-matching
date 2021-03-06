[![Build Status](https://api.travis-ci.org/roli93/babel-plugin-js-pattern-matching.svg?branch=master) ]( https://travis-ci.org/roli93/babel-plugin-js-pattern-matching)
[![Dependency Status](https://david-dm.org/roli93/babel-plugin-js-pattern-matching.svg)](https://david-dm.org/roli93/babel-plugin-js-pattern-matching)
[![devDependencies Status](https://david-dm.org/roli93/babel-plugin-js-pattern-matching/dev-status.svg)](https://david-dm.org/roli93/babel-plugin-js-pattern-matching?type=dev)

Babel Plugin for JS-Pattern-Matching
====================
This is a Babel Plugin intended to make [JS-Pattern-Matching](https://www.npmjs.com/package/js-pattern-matching) compatible with [Babel](https://babeljs.io/)  (and, therefore, with non-ES2015 environments)

```javascript
import match from 'js-pattern-matching';

const sum = (list) =>  match (list) (
  ([x,...xs]) => x + sum(xs),
  ([]) => 0
)

console.log(sum([]));
// prints 0
console.log(sum([1,2,3]));
// prints 6
```

Installation
====================

```
npm install --save-dev babel-plugin-js-pattern-matching
```

To use the plugin, first install it with the above command.

Usage
====================
To use [JS-Pattern-Matching](https://www.npmjs.com/package/js-pattern-matching) together with [Babel](https://babeljs.io/), just add the plugin to your `.babelrc` file:

```javascript
{
  "presets": [
    "es2015"
  ],
  "plugins": [
      "babel-plugin-js-pattern-matching",
  ]
}
```
Important note about usage
--------------------------

The plugin currently relies on the `match` function being imported and used with that name. If you import it using another name, it will probably not work. Support for custom names is planned for the next release.
