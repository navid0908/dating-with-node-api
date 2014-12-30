var baseModel = require('./base');
var Promise = require('bluebird');
var uuid = require('node-uuid');
var Invitationcode;

	Invitationcode = baseModel.Model.extend({
		tableName: 'invitationcode',
		hasTimestamps: false,
		// default values for when the record is created.
		defaults: function() {
			var defaults = {
				is_used : 0,
				created_at : new Date()
			}
			return defaults;
		}
	},{
		add: function (options) {
			var data = {};
			data.code = uuid.v4();
			return baseModel.Model.add.call(this, data, options);
		}
	});

module.exports = baseModel.model('Invitationcode', Invitationcode);
			