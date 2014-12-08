/**
* @description - The purpose of this model is to lookup various countries.
*/

var baseModel = require('./base');
var Country;

	Country = baseModel.Model.extend({
		tableName: 'country'
	});

module.exports = baseModel.model('Country', Country);
