var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'smoke'],
	description: "Lookup for various smoking habbits",
	handler: function (request, reply) {
		dbHandler.db.models.smoke.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}