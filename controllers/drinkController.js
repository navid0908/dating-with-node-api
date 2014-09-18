var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'drink'],
	description: "Lookup for various drinking habbits",
	handler: function (request, reply) {
		dbHandler.db.models.drink.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}