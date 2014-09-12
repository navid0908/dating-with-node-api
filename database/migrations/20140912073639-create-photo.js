var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable('photo', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user_id: { type: 'int'}, /* References the user table*/
      phototype_id: { type: 'int'}, /* References the phototype table*/
      location: { type: 'string', length: 60}, /* location of where the id is stored - S3 bucket */
      caption: { type: 'string', length: 140}, /* Something about the photo... */
      is_primary: { type: 'smallint', length: 1}, //1=yes, 0=no      
      created: { type: 'datetime'},
      modified: { type: 'datetime'}
    },
    ifNotExists: true
  }, callback);
}

exports.down = function (db, callback) {
  db.dropTable('photo', callback);
};