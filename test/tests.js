'use strict';

var GetIntrinsic = require('es-abstract/GetIntrinsic');
var $Map = GetIntrinsic('%Map%', true);
var $Set = GetIntrinsic('%Set%', true);

module.exports = function (toJSON, t) {
	t.test('Sets', { skip: !$Set }, function (st) {
		var set = new $Set(); // Some engines’ native Sets can’t take an iterable
		var arr = [1, 2, 3];
		arr.forEach(function (x) { set.add(x); });
		st.deepEqual(toJSON(set), arr, '`new Set(iterable)` toJSONs to similar Array');
		st.deepEqual(toJSON(new $Set()), [], 'empty Set toJSONs to empty Array');
		st.end();
	});

	t.test('Maps', { skip: !$Map }, function (st) {
		var entries = [[1, 2], [3, 4]];
		var map = new $Map(); // Some engines’ native Maps can’t take an iterable
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
