var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'country'],
	description: "Lookup for various countries",
	handler: function (request, reply) {		
		dbHandler.db.models.country.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}
