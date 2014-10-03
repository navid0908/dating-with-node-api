'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('profile', function (table) {
            table.increments('id').primary();
            table.integer('user_id').nullable().unsigned().references('user.id');
            table.integer('location_id').nullable().unsigned().references('location.id');
            table.integer('bodytype_id').nullable().unsigned().references('bodytype.id');
            table.integer('diet_id').nullable().unsigned().references('diet.id');
            table.integer('smoke_id').nullable().unsigned().references('smoke.id');
            table.integer('drug_id').nullable().unsigned().references('drug.id');
            table.integer('drink_id').nullable().unsigned().references('drink.id');
            table.integer('education_id').nullable().unsigned().references('education.id');
            table.integer('children_id').nullable().unsigned().references('children.id');
            table.decimal('height', 2, 2).nullable();
            table.string('gender', 1).nullable();
            table.string('orientation', 1).nullable();
            table.date('birthday').nullable();
            table.timestamps();
        });     
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profile');
}
