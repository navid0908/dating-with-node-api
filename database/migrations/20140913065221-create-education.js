'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('education', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'High school'},
                    {description:'Two-year college'},
                    {description:'College/University'},
                    {description:'Masters'},
                    {description:'Law School'},
                    {description:'Med School'},
                    {description:'PH.D Program'},
        		]).into('education');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('education');
}
