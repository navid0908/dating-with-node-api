var async = require('async');

exports.up = function (db, callback) {
	async.series([
	    db.createTable.bind(db, 'location', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
      		  user_id: { type: 'int'}, /* References the user table */
      		  country_id: { type: 'int'}, /* References the country table */
      		  postalcode: { type: 'string', length: 10},
      		  city: { type: 'string', length: 45},
      		  created: { type: 'datetime'},
      		  modified: { type: 'datetime'}
		    },
		    ifNotExists: true
	  	}),
	  	db.runSql.bind(db,'ALTER TABLE location ADD CONSTRAINT fk_location_user_id FOREIGN KEY (user_id) REFERENCES user(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE location ADD CONSTRAINT fk_location_country_id FOREIGN KEY (country_id) REFERENCES country(id)', [])
	], callback);
};

exports.down = function (db, callback) {
  async.series([
        db.runSql.bind(db,'ALTER TABLE location DROP FOREIGN KEY fk_location_user_id', []),
        db.runSql.bind(db,'ALTER TABLE location DROP FOREIGN KEY fk_location_country_id', []),
        db.dropTable.bind(db,'location')
    ], callback);
};