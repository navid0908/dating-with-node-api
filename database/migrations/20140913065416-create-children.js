'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('children', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Might want kids'},
                    {description:'Want kids'},
                    {description:'No thanks'},
        		]).into('children');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('children');
}
