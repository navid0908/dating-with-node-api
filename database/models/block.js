/**
* @description - The purpose of this model is to prevent users from stalking other users.
*/

var baseModel = require('./base');
var Block;

	Block = baseModel.Model.extend({
		tableName: 'block'
	});

module.exports = baseModel.model('Block', Block);
