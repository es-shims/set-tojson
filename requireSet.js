'use strict';

var GetIntrinsic = require('get-intrinsic');
var $Set = GetIntrinsic('%Set%', true);
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function requireGlobalSet() {
	if (!$Set) {
		throw new $TypeError('Set.prototype.toJSON requires Set (either native, or polyfilled with es6-shim)');
	}
};
