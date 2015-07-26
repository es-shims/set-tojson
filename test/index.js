'use strict';

var toJSON = require('../');
var test = require('tape');

test('as a function', function (t) {
	t.test('bad Set/this value', function (st) {
		st.throws(function () { return toJSON(undefined, 'a'); }, TypeError, 'undefined is not an object');
		st.throws(function () { return toJSON(null, 'a'); }, TypeError, 'null is not an object');
		st.end();
	});

	require('./tests')(toJSON, t);

	t.end();
});
