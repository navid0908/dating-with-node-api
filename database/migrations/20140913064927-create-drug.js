var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'drug', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'drug', ['description'], ['Never']),
		db.insert.bind(db, 'drug', ['description'], ['Sometimes']),
		db.insert.bind(db, 'drug', ['description'], ['Often'])		
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('drug', callback);
};