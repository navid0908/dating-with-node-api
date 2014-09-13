var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'diet', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'diet', ['description'], ['Anything']),
		db.insert.bind(db, 'diet', ['description'], ['Vegetarian']),
		db.insert.bind(db, 'diet', ['description'], ['Vegan']),
		db.insert.bind(db, 'diet', ['description'], ['Kosher']),
		db.insert.bind(db, 'diet', ['description'], ['Halal']),
	  	db.insert.bind(db, 'diet', ['description'], ['Other'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('diet', callback);
};