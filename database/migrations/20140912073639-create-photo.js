'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('photo', function (table) {
            table.increments('id').primary();
            table.integer('user_id').notNullable().unsigned().references('user.id');
            table.integer('phototype_id').notNullable().unsigned().references('phototype.id');
            table.string('location', 60).nullable();
            table.string('caption', 140).nullable();
        });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photo');
}
