'use strict';

var RequireObjectCoercible = require('es-abstract/2021/RequireObjectCoercible');
var define = require('define-properties');
var callBind = require('call-bind');

var getPolyfill = require('./polyfill');
var implementation = require('./implementation');
var shim = require('./shim');

var bound = callBind(getPolyfill());

var boundSetToJSON = function setToJSON(set) {
	RequireObjectCoercible(set);
	return bound(set);
};
define(boundSetToJSON, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	method: implementation, // TODO: remove at semver-major
	shim: shim
});

module.exports = boundSetToJSON;
