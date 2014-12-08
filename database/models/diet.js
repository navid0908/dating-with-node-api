/**
* @description - The purpose of this model is to lookup various Diet habbits of a user.
*/

var baseModel = require('./base');
var Diet;

	Diet = baseModel.Model.extend({
		tableName: 'diet'
	});

module.exports = baseModel.model('Diet', Diet);
