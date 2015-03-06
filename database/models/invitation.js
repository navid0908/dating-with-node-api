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
		},
		isUsed : function(){
			return this.get('is_used') == 1;
		},
		markUsed : function(){
			return this.set('is_used', 1);
		}
	},{
		notInvited : 'nocode',
		statusPending: 'pending',
		statusActive: 'active',

		findByInvitationCode : function(code, options){
			return baseModel.Model.findOne.call(this, {code:code}, options);
		},
		countOfInvitesSent : function(user_id){
			return baseModel.Model.findAll.call(this, {user_id:user_id}).then(function(collection){
				return collection.length;
			});
		},
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