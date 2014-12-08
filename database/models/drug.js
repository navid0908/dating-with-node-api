/**
* @description - The purpose of this model is to lookup various Drug activities of a user.
*/

var baseModel = require('./base');
var Drug;

	Drug = baseModel.Model.extend({
		tableName: 'drug'
	});

module.exports = baseModel.model('Drug', Drug);