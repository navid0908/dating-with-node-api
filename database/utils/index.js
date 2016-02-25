'use strict';

var _ = require('lodash');
var schema = require("../schema/dating-with-node");

function createTable(tableName, knex) {
    return knex.schema.createTable(tableName, function (t) {
        var columnKeys = _.keys(schema[tableName]);
        _.each(columnKeys, function (columnName) {
            return addTableColumn(tableName, knex, t, columnName);
        });
    });
}

function addTableColumn(tableName, knex, table, columnName) {
	var column;	
	var columnSpec = schema[tableName][columnName];

	// creation distinguishes between text with fieldtype, string with maxlength and integer with fieldtype and all others
	if (columnSpec.type === 'text' && columnSpec.hasOwnProperty('fieldtype')) {
		column = table[columnSpec.type](columnName, columnSpec.fieldtype);
	} else if (columnSpec.type === 'string' && columnSpec.hasOwnProperty('maxlength')) {
		column = table[columnSpec.type](columnName, columnSpec.maxlength);
    } else if (columnSpec.type === 'integer' && columnSpec.hasOwnProperty('fieldtype')) {
		column = table['specificType'](columnName, columnSpec.fieldtype);
    } else {
		column = table[columnSpec.type](columnName);
    }	
	if (columnSpec.hasOwnProperty('nullable') && columnSpec.nullable === true) {
		column.nullable();
	} else {
		column.notNullable();
	}
	if (columnSpec.hasOwnProperty('primary') && columnSpec.primary === true) {
		column.primary();
	}
	if (columnSpec.hasOwnProperty('unique') && columnSpec.unique) {
		column.unique();
	}
	if (columnSpec.hasOwnProperty('unsigned') && columnSpec.unsigned) {
		column.unsigned();
	}
	if (columnSpec.hasOwnProperty('references')) {
		// check if table exists?
		column.references(columnSpec.references);
	}
	if (columnSpec.hasOwnProperty('defaultTo')) {
		column.defaultTo(columnSpec.defaultTo);
	}
	if (columnSpec.type === 'dateTime' && columnSpec.hasOwnProperty('nullable') && columnSpec.nullable === false) {
		column.defaultTo(knex.fn.now())
	}
}

function deleteTable(tableName, knex) {
    return knex.schema.dropTableIfExists(tableName);
}

function populateTable(tableName, knex, data){	
	return knex.insert(data).into(tableName);
}

module.exports = {
    createTable: createTable,
    deleteTable: deleteTable,
    populateTable : populateTable,
};