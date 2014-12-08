/**
* @description - The purpose of this model is to lookup various professions a user can pick.
*/

var baseModel = require('./base');
var Profession;

	Profession = baseModel.Model.extend({
		tableName: 'profession'
	});

module.exports = baseModel.model('Profession', Profession);
