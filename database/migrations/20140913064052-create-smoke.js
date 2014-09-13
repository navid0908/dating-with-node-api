var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'smoke', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'smoke', ['description'], ['Yes']),
		db.insert.bind(db, 'smoke', ['description'], ['Sometimes']),
		db.insert.bind(db, 'smoke', ['description'], ['When drinking']),
		db.insert.bind(db, 'smoke', ['description'], ['Trying to quit']),
		db.insert.bind(db, 'smoke', ['description'], ['No'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('smoke', callback);
};