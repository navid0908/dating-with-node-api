/**
* @description - The purpose of this model is to lookup various Body types.
*/

var baseModel = require('./base');
var Bodytype;

	Bodytype = baseModel.Model.extend({
		tableName: 'bodytype'
	});

module.exports = baseModel.model('Bodytype', Bodytype);