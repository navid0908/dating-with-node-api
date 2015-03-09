/**
* @description - The purpose of this model is to lookup various user settings
*/

var baseModel = require('./base');
var Setting;

	Setting = baseModel.Model.extend({
		tableName: 'setting',
		hasTimestamps: false
	},{
		CONST_USER_MAX_INVITE: 'user_max_invite',
	    /**
	    * ### findBySettingName - Finds a user setting by the setting name
	    *
	    * @param {object} data
	    * @param {object} options
	    * @extends baseModel.Model.findOne
	    */		
		findBySettingName : function(data, options){
			var that = this;
			if(!data.user_id){
				return Promise.reject('user is undefined');
			}
			if(!data.name){
				return Promise.reject('setting name is undefined');
			}
			return baseModel.Model.findOne.call(this, {name:data.name, user_id: data.user_id}, options).then(function(record){
				if(record){
					return record.get('value');
				}
				return null;
			});
		}
	});

module.exports = baseModel.model('Setting', Setting);