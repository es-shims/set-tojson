# set-tojson <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

[![browser support][9]][10]

ES7 Proposal: Set#toJSON https://github.com/DavidBruant/Map-Set.prototype.toJSON

This polyfill is spec-compliant (based on the spec so far).
It will work in every engine in which Set exists natively, or where it is polyfilled with the (es6-shim)[es6-shim-url]

## Example

```js
var setToJSON = require('set-tojson');
var assert = require('assert');
var items = ['a', 'b', 'c'];
var entries = [[1, 2], [3, 4]];

assert.deepEqual(setToJSON(new Set()), []);
assert.deepEqual(setToJSON(new Set(items)), items);
assert.deepEqual(setToJSON(new Map()), []);
assert.deepEqual(setToJSON(new Map(entries)), entries);
assert.deepEqual(setToJSON(''), []);
assert.deepEqual(setToJSON('abc'), ['a', 'b', 'c']);
assert.deepEqual(setToJSON([]), []);
assert.deepEqual(setToJSON(items), items);
assert.deepEqual(setToJSON(entries), entries);

setToJSON.shim();
assert.deepEqual(new Set(items).toJSON(), items);
assert.deepEqual(new Set().toJSON(), []);

```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/set-tojson
[2]: http://vb.teelaun.ch/ljharb/set-tojson.svg
[3]: https://travis-ci.org/ljharb/set-tojson.svg
[4]: https://travis-ci.org/ljharb/set-tojson
[5]: https://david-dm.org/ljharb/set-tojson.svg
[6]: https://david-dm.org/ljharb/set-tojson
[7]: https://david-dm.org/ljharb/set-tojson/dev-status.svg
[8]: https://david-dm.org/ljharb/set-tojson#info=devDependencies
[9]: https://ci.testling.com/ljharb/set-tojson.png
[10]: https://ci.testling.com/ljharb/set-tojson
[11]: https://nodei.co/npm/set-tojson.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/set-tojson.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/set-tojson.svg
[downloads-url]: http://npm-stat.com/charts.html?package=set-tojson
[es6-shim-url]: https://github.com/es-shims/es6-shim
