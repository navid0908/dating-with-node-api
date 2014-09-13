var async = require('async');

exports.up = function (db, callback) {
	async.series([
	    db.createTable.bind(db, 'profile', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
      		  user_id: { type: 'int'}, /* References the user table */
      		  location_id: { type: 'int'}, /* References the location table */      		  
      		  bodytype_id: { type: 'int'}, /* References the bodytype table */
      		  diet_id: { type: 'int'}, /* References the diet table */
      		  smoke_id: { type: 'int'}, /* References the smoke table */
      		  drug_id: { type: 'int'}, /* References the drug table */      		  
      		  drink_id: { type: 'int'}, /* References the drink table */
      		  education_id: { type: 'int'}, /* References the education table */
      		  children_id: { type: 'int'}, /* References the children table */
      		  height: { type: 'decimal', length: 10},
      		  gender: {type: 'char', length: 1}, /* M/F */
      		  orientation: {type: 'char', length: 1}, /* S(Straight)/G(Gay)/B(Bisexual) */
      		  birthday: {type: 'datetime'},
      		  created: { type: 'datetime'},
      		  modified: { type: 'datetime'}
		    },
		    ifNotExists: true
	  	}),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_user_id FOREIGN KEY (user_id) REFERENCES user(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_location_id FOREIGN KEY (location_id) REFERENCES location(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_bodytype_id FOREIGN KEY (bodytype_id) REFERENCES bodytype(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_diet_id FOREIGN KEY (diet_id) REFERENCES diet(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_smoke_id FOREIGN KEY (smoke_id) REFERENCES smoke(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_drug_id FOREIGN KEY (drug_id) REFERENCES drug(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_drink_id FOREIGN KEY (drink_id) REFERENCES drink(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_education_id FOREIGN KEY (education_id) REFERENCES education(id)', []),
	  	db.runSql.bind(db,'ALTER TABLE profile ADD CONSTRAINT fk_profile_children_id FOREIGN KEY (children_id) REFERENCES children(id)', [])
	], callback);
};

exports.down = function (db, callback) {
  async.series([
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_user_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_location_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_bodytype_id', []),        
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_diet_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_smoke_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_drug_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_drink_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_education_id', []),
        db.runSql.bind(db,'ALTER TABLE profile DROP FOREIGN KEY fk_profile_children_id', []),
        db.dropTable.bind(db,'profile')
    ], callback);
};