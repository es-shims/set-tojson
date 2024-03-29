'use strict';

var RequireObjectCoercible = require('es-abstract/2021/RequireObjectCoercible');
var iterate = require('iterate-value');
var callBound = require('call-bind/callBound');
var $setSize = callBound('%Set.prototype.size%', true);

var requireSet = require('./requireSet');

module.exports = function toJSON() {
	RequireObjectCoercible(this);
	requireSet();
	$setSize(this);
	return iterate(this);
};
