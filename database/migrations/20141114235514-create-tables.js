'use strict';

var _ = require('lodash');
var schema = require("../schema/dating-with-node");
var fixtures = require("../fixtures/dating-with-node");
var utils = require("../utils");
var sequence = require('../utils/sequence');

function loadTables(tableNames,knex){
 	return _.map(tableNames, function (tableName) {
		return function(){
			return utils.createTable(tableName, knex);	
		}
	});	
}

function populateTables(tableNames, knex){
	return _.map(tableNames, function (tableName) {
		if (fixtures.hasOwnProperty(tableName)){			
			return utils.populateTable(tableName, knex, fixtures[tableName]);
		}
	});
}

function dropTables(tableNames,knex){
 	return _.map(tableNames, function (tableName) {
		return function(){
			return utils.deleteTable(tableName, knex);
		}
	});
}

exports.up = function(knex, Promise) {
	var tables = [];
	var tableSequence;
	var tableNames = _.keys(schema);

	tables = loadTables(tableNames,knex);
	tableSequence = sequence(tables);	

	return tableSequence.then(function () {
		console.log('DB setup successful.');
		return Promise.all(populateTables(tableNames,knex));
    });
};

exports.down = function(knex, Promise) {
	var tables = [];
	var tableSequence;
	var tableNames = _.keys(schema).reverse();

	tables = dropTables(tableNames,knex);
	tableSequence = sequence(tables);

	return tableSequence.then(function () {
		console.log('DB cleanup successful');
    });
};
