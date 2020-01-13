'use strict';

var RequireObjectCoercible = require('es-abstract/2019/RequireObjectCoercible');
var iterate = require('iterate-value');
var callBound = require('es-abstract/helpers/callBound');
var $setSize = callBound('%Set.prototype.size', true);

var requireSet = require('./requireSet');

module.exports = function toJSON() {
	RequireObjectCoercible(this);
	requireSet();
	$setSize(this);
	return iterate(this);
};
