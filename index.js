'use strict';

var ES = require('es-abstract/es7');
var define = require('define-properties');

if (!ES.IsCallable(Set)) {
	module.exports = new Error('Set.prototype.toJSON requires Set (either native, or polyfilled with es6-shim)');
	return;
}

var setValues = Set.prototype.values;

// polyfilled Sets with es6-shim might exist without for..of
var iterateWithWhile = function (set, receive) {
	var values = setValues.call(set);
	var next;
	do {
		next = values.next();
		receive(next.value);
	} while (!next.done);
};

var iterate = (function () {
	try {
		// Safari 8's native Set can't be iterated except with for..of
		return Function('set', 'receive', 'for (var value of set) { receive(value); }');
	} catch (e) {
		/* for..of seems to not be supported */
	}
	return iterateWithWhile;
}());

var setToJSONshim = function toJSON() {
	ES.RequireObjectCoercible(this);
	var values = [];
	if (ES.IsCallable(Array.from)) {
		values = Array.from(this);
	} else {
		iterate(this, Array.prototype.push.bind(values));
	}
	return values;
};

var boundSetToJSON = function setToJSON(set) {
	ES.RequireObjectCoercible(set);
	return setToJSONshim.call(set);
};
define(boundSetToJSON, {
	method: setToJSONshim,
	shim: function shimSetPrototypeToJSON() {
		define(Set.prototype, {
			toJSON: setToJSONshim
		});
		return Set.prototype.toJSON;
	}
});
module.exports = boundSetToJSON;
