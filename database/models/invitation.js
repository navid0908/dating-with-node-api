var baseModel = require('./base');
var Promise = require('bluebird');
var Invitation;

	Invitation = baseModel.Model.extend({
		tableName: 'invitation',
		hasTimestamps: false,
	},{
		add: function (data, options) {
			if(!data.email){
				return Promise.reject('email is undefined');
			}
			if(!data.invitationcode_id){
				return Promise.reject('invitation code is undefined');
			}
			if(!data.inviter_user_id){
				return Promise.reject('user sending the invitation is undefined');
			}

			return baseModel.Model.add.call(this, data, options);
		}
	});

module.exports = baseModel.model('Invitation', Invitation);