'use strict';

var isCallable = require('es-abstract/es7').IsCallable;
var hasSets = typeof Set !== 'undefined' && isCallable(Set);
var hasMaps = typeof Map !== 'undefined' && isCallable(Map);

module.exports = function (toJSON, t) {
	t.test('Sets', { skip: !hasSets }, function (st) {
		var set = new Set(); // Some engines’ native Sets can’t take an iterable
		var arr = [1, 2, 3];
		arr.forEach(function (x) { set.add(x); });
		st.deepEqual(toJSON(set), arr, '`new Set(iterable)` toJSONs to similar Array');
		st.deepEqual(toJSON(new Set()), [], 'empty Set toJSONs to empty Array');
		st.end();
	});

	t.test('Maps', { skip: !hasMaps }, function (st) {
		var entries = [[1, 2], [3, 4]];
		var map = new Map(); // Some engines’ native Maps can’t take an iterable
		entries.forEach(function (entry) { map.set(entry[0], entry[1]); });
		st['throws'](function () { return toJSON(map); }, TypeError, 'Maps do not have a [[SetData]] internal slot');
		st.end();
	});

	t.test('non-Sets', function (st) {
		st['throws'](function () { return toJSON([]); }, TypeError, 'Arrays do not have a [[SetData]] internal slot');
		st['throws'](function () { return toJSON({}); }, TypeError, 'Objects do not have a [[SetData]] internal slot');
		st['throws'](function () { return toJSON(''); }, TypeError, 'Strings do not have a [[SetData]] internal slot');
		st.end();
	});
};
