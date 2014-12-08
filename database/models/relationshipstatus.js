/**
* @description - The purpose of this model is to lookup various Relationship statues.
*/

var baseModel = require('./base');
var Relationshipstatus;

	Relationshipstatus = baseModel.Model.extend({
		tableName: 'relationshipstatus'
	});

module.exports = baseModel.model('Relationshipstatus', Relationshipstatus);
