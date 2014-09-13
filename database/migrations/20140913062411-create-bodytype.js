var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'bodytype', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'bodytype', ['description'], ['Rather not say']),
		db.insert.bind(db, 'bodytype', ['description'], ['Thin']),
		db.insert.bind(db, 'bodytype', ['description'], ['Overweight']),
		db.insert.bind(db, 'bodytype', ['description'], ['Skinny']),
		db.insert.bind(db, 'bodytype', ['description'], ['Average']),
	  	db.insert.bind(db, 'bodytype', ['description'], ['Fit']),
		db.insert.bind(db, 'bodytype', ['description'], ['Athletic']),
		db.insert.bind(db, 'bodytype', ['description'], ['A little extra']),
		db.insert.bind(db, 'bodytype', ['description'], ['Curvy']),
		db.insert.bind(db, 'bodytype', ['description'], ['Full figured'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('bodytype', callback);
};