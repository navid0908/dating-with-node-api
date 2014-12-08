/**
* @description - The purpose of this model is to lookup various Activity Levels.
*/

var baseModel = require('./base');
var Activelevel;

	Activelevel = baseModel.Model.extend({
		tableName: 'activelevel',
		hasTimestamps: false,
	});

module.exports = baseModel.model('Activelevel', Activelevel);
