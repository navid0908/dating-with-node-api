var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'diet'],
	description: "Lookup for various diets",
	handler: function (request, reply) {
		dbHandler.db.models.diet.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}