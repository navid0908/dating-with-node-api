var baseModel = require('./base');
var Promise = require('bluebird');
var Invitation;

	Invitation = baseModel.Model.extend({
		tableName: 'invitation',
		hasTimestamps: false,
	});

module.exports = baseModel.model('Invitation', Invitation);