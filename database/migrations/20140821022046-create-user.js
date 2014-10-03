'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(table) {
      table.increments('id');
      table.string('username', 30).notNullable().unique();
      table.string('email', 60).nullable();
      table.string('password', 60).nullable();
      table.string('salt', 60).nullable();
      table.specificType('group_id', 'smallint').nullable();
      table.string('social_login_type', 20).nullable();
      table.string('social_login_token', 60).nullable();
      table.string('status', 10).nullable(); //pending,active,deleted
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
}
 