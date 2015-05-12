var test = require('tape');
var defineProperties = require('define-properties');
var bind = require('function-bind');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var isCallable = require('es-abstract/es7').IsCallable;
var functionsHaveNames = function f() {}.name === 'f';
var hasSets = typeof Set !== 'undefined' && isCallable(Set);

var toJSON = require('../');

test('no Sets', { skip: hasSets }, function (t) {
	t.throws(toJSON.shim, TypeError, 'shim method throws when Set doesn’t exist');
	t.end();
});

test('shimmed', { skip: !hasSets }, function (t) {
	toJSON.shim();
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
