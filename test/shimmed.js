'use strict';

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var GetIntrinsic = require('get-intrinsic');
var $Set = GetIntrinsic('%Set%', true);
var functionsHaveNames = require('functions-have-names')();
var hasStrictMode = require('has-strict-mode')();

var toJSON = require('..');
var runTests = require('./tests');

test('no Sets', { skip: $Set }, function (t) {
	t['throws'](toJSON.shim, TypeError, 'shim method throws when Set doesn’t exist');
	t.end();
});

test('shimmed', { skip: !$Set }, function (t) {
	require('../auto'); // eslint-disable-line global-require
	t.equal(Set.prototype.toJSON.length, 0, 'Set#toJSON has the right arity');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Set.prototype.toJSON.name, 'toJSON', 'Set#toJSON has name "toJSON"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Set.prototype, 'toJSON'), 'Set#toJSON is not enumerable');
		et.end();
	});

	t.test('bad array/this value', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return toJSON(undefined, 'a'); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return toJSON(null, 'a'); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Set.prototype.toJSON), t);

	t.end();
});
