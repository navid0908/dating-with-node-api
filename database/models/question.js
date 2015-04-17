/**
* @description - The purpose of this model is to lookup various questions related to a user.
*/

var baseModel = require('./base');
var Question;

	Question = baseModel.Model.extend({
		tableName: 'question',
		hasTimestamps: false,
	});

module.exports = baseModel.model('Question', Question);
