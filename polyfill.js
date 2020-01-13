'use strict';

var GetIntrinsic = require('es-abstract/GetIntrinsic');
var $Set = GetIntrinsic('%Set%', true);

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (!$Set || !$Set.prototype.toJSON) {
		return implementation;
	}
	return $Set.prototype.toJSON;
};
