'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('diet', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Anything'},
                    {description:'Vegetarian'},
                    {description:'Vegan'},
                    {description:'Kosher'},
                    {description:'Halal'},
                    {description:'Other'}
        		]).into('diet');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('diet');
}
