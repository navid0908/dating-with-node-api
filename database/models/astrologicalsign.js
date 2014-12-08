/**
* @description - The purpose of this model is to lookup various Astrological Signs
*/

var baseModel = require('./base');
var Astrologicalsign;

	Astrologicalsign = baseModel.Model.extend({
		tableName: 'astrologicalsign',
		hasTimestamps: false,
	});

module.exports = baseModel.model('Astrologicalsign', Astrologicalsign);