/**
 * @description - The purpose of this model is to store a user's profile.
 */

var baseModel = require('./base');
var Profile;

	Profile = baseModel.Model.extend({
		tableName: 'profile'
	});

module.exports = baseModel.model('Profile', Profile);
