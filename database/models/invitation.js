var baseModel = require('./base');
var Promise = require('bluebird');
var uuid = require('node-uuid');
var Invitation;

	Invitation = baseModel.Model.extend({
		tableName: 'invitation',
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
		add: function (data, options) {
			if(!data.email){
				return Promise.reject('email is undefined');
			}
			if(!data.user_id){
				return Promise.reject('user sending the invitation is undefined');
			}
			data.code = uuid.v4();

			return baseModel.Model.add.call(this, data, options);
		}
	});

module.exports = baseModel.model('Invitation', Invitation);