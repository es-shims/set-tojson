var toJSON = require('../');
toJSON.shim();

var test = require('tape');
var defineProperties = require('define-properties');
var bind = require('function-bind');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = function f() {}.name === 'f';

test('shimmed', function (t) {
	t.equal(Set.prototype.toJSON.length, 0, 'Set#toJSON has the right arity');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Set.prototype.toJSON.name, 'toJSON', 'Set#toJSON has name "toJSON"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Set.prototype, 'toJSON'), 'Set#toJSON is not enumerable');
		et.end();
	});

	var supportsStrictMode = (function () {
		'use strict';
		var fn = function () { return this === null; };
		return fn.call(null);
	}());

	t.test('bad array/this value', { skip: !supportsStrictMode }, function (st) {
		'use strict';
		st.throws(function () { return toJSON(undefined, 'a'); }, TypeError, 'undefined is not an object');
		st.throws(function () { return toJSON(null, 'a'); }, TypeError, 'null is not an object');
		st.end();
	});

	require('./tests')(bind.call(Function.call, Set.prototype.toJSON), t);

	t.end();
});
