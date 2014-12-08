/**
* @description - The purpose of this model is to lookup various Children a user identifies with.
*/

var baseModel = require('./base');
var Children;

	Children = baseModel.Model.extend({
		tableName: 'children'
	});

module.exports = baseModel.model('Children', Children);
