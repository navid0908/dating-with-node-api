/**
* @description - The purpose of this model is to lookup various smoking habbits of a user.
*/

var datingWithNode = require('./base');
var Smoke;

	Smoke = datingWithNode.Model.extend({
		tableName: 'smoke'
	});

module.exports = datingWithNode.model('Smoke', Smoke);