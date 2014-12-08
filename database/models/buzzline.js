/**
* @description - The purpose of this model is to lookup various Buzz lines a user can send in a message.
*/

var baseModel = require('./base');
var Buzzline;

	Buzzline = baseModel.Model.extend({
		tableName: 'buzzline'
	});

module.exports = baseModel.model('Buzzline', Buzzline);
