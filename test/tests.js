module.exports = function (toJSON, t) {
	var sparseish = { length: 5, 0: 'a', 1: 'b' };
	var overfullarrayish = { length: 2, 0: 'a', 1: 'b', 2: 'c' };
	var arr = [1, 2, 3];
	var set = new Set(); // Some engines’ native Sets can’t take an iterable
	arr.forEach(function (x) { set.add(x); });
	var entries = [[1, 2], [3, 4]];
	var map = new Map(); // Some engines’ native Maps can’t take an iterable
	entries.forEach(function (entry) { map.set(entry[0], entry[1]); });

	t.test('Sets', function (st) {
		st.deepEqual(toJSON(set), arr, '`new Set(iterable)` toJSONs to similar Array');
		st.deepEqual(toJSON(new Set()), [], 'empty Set toJSONs to empty Array');
		st.end();
	});

	t.test('Arrays', function (st) {
		st.deepEqual(toJSON([]), [], 'an empty Array toJSONs to an empty Array');
		st.deepEqual(toJSON(arr), arr, 'Array toJSONs to a similar Array');
		st.end();
	});

	t.skip('array-likes', function (st) {
		// skipped for now. currently throws.
		st.deepEqual(toJSON(sparseish), ['a', 'b', undefined, undefined, undefined], 'sparse array-like toJSONs to dense Array');
		st.deepEqual(toJSON(overfullarrayish), ['a', 'b'], 'array-like with extra properties toJSONs to properly lengthed Array');
		st.end();
	});

	t.test('Strings', function (st) {
		st.deepEqual(toJSON(''), [], 'empty string toJSONs to an empty Array');
		st.deepEqual(toJSON('abc'), ['a', 'b', 'c'], 'string toJSONs to an Array of characters');
		st.end();
	});

	t.test('Maps', function (st) {
		st.deepEqual(toJSON(new Map()), [], 'empty Map toJSONs to an empty Array');
		st.deepEqual(toJSON(map), entries, '`new Map(entries)` toJSONs to an Array of entries');
		st.end();
	});
};
