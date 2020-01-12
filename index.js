'use strict';

var IsCallable = require('es-abstract/2019/IsCallable');
var RequireObjectCoercible = require('es-abstract/2019/RequireObjectCoercible');
var define = require('define-properties');
var iterate = require('iterate-value');
var callBound = require('es-abstract/helpers/callBound');
var $setSize = callBound('%Set.prototype.size', true);

var hasSets = typeof Set !== 'undefined' && IsCallable(Set);

var requireSet = function requireGlobalSet() {
	if (!hasSets) {
		throw new TypeError('Set.prototype.toJSON requires Set (either native, or polyfilled with es6-shim)');
	}
};

var setToJSONshim = function toJSON() {
	RequireObjectCoercible(this);
	requireSet();
	$setSize(this);
	return iterate(this);
};

var boundSetToJSON = function setToJSON(set) {
	RequireObjectCoercible(set);
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
