'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authattempt', function (table) {
            table.increments('id').primary();
            table.string('email', 60).notNullable();
            table.string('ip', 20).notNullable();
            table.date('created_at').notNullable();
        });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authattempt');
}