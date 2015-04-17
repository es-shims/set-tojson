'use strict';

var ES = require('es-abstract/es7');
var define = require('define-properties');
var isString = require('is-string');

var hasSets = typeof Set !== 'undefined' && ES.IsCallable(Set);

var setValues;
if (hasSets) { setValues = Set.prototype.values; }
var slice = Array.prototype.slice;
var split = String.prototype.split;

// polyfilled Sets with es6-shim might exist without for..of
var iterateWithWhile = function (set, receive) {
	var values = setValues.call(set);
	var next;
	do {
		next = values.next();
	} while (!next.done && receive(next.value));
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

var requireSet = function requireSet() {
	if (!hasSets) {
		throw new TypeError('Set.prototype.toJSON requires Set (either native, or polyfilled with es6-shim)');
	}
};

var setToJSONshim = function toJSON() {
	ES.RequireObjectCoercible(this);
	var values = [];
	if (Array.isArray(this)) {
		values = slice.call(this);
	} else if (isString(this)) {
		values = split.call(this, '');
	} else if (ES.IsCallable(Array.from)) {
		values = Array.from(this);
	} else if (hasSets) {
		iterate(this, Array.prototype.push.bind(values));
	} else {
		requireSet();
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
		requireSet();
		define(Set.prototype, {
			toJSON: setToJSONshim
		});
		return Set.prototype.toJSON;
	}
});
module.exports = boundSetToJSON;
