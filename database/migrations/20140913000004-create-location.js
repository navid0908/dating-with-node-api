'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('location', function (table) {
            table.increments('id').primary();
            table.integer('user_id').notNullable().unsigned().references('user.id');
            table.integer('country_id').notNullable().unsigned().references('country.id');
            table.string('postalcode', 10).nullable();
            table.string('city', 45).nullable();
            table.timestamps();
        });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
}
