/**
* @description - The purpose of this model is to lookup various Drinking activities for a user
*/

var baseModel = require('./base');
var Drink;

	Drink = baseModel.Model.extend({
		tableName: 'drink'
	});

module.exports = baseModel.model('Drink', Drink);