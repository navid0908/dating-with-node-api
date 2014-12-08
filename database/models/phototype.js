/**
* @description - The purpose of this model is to lookup various Photos types (thumbnail, original).
*/

var baseModel = require('./base');
var Phototype;

	Phototype = baseModel.Model.extend({
		tableName: 'phototype'
	});

module.exports = baseModel.model('Phototype', Phototype);
