var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'children'],
	description: "Lookup for children",
	handler: function (request, reply) {
		dbHandler.models.Children.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
