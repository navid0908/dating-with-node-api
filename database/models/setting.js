/**
* @description - The purpose of this model is to lookup various user settings
*/

var datingWithNode = require('./base');
var Setting;

	Setting = datingWithNode.Model.extend({
		tableName: 'setting'
	},{
	    /**
	    * ### findBySettingName - Finds a user setting by the setting name
	    *
	    * @param {object} data
	    * @param {object} options
	    * @extends baseModel.Model.findOne
	    */		
		findBySettingName : function(data, options){
			if(!data.user_id){
				return Promise.reject('user is undefined');
			}
			if(!data.name){
				return Promise.reject('setting name is undefined');
			}
			return baseModel.Model.findOne.call(this, {name:data.name, user_id: data.user_id}, options);
		}
	});

module.exports = datingWithNode.model('Setting', Setting);