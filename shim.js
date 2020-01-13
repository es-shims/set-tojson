'use strict';

var define = require('define-properties');

var requireSet = require('./requireSet');
var polyfill = require('./polyfill')();

module.exports = function shimSetPrototypeToJSON() {
	requireSet();
	define(Set.prototype, {
		toJSON: polyfill
	}, {
		toJSON: Set.prototype.toJSON !== polyfill
	});
	return Set.prototype.toJSON;
};
