/**
 * @description - This is the model from which all other Dating-With-Node models extend. The model is based on
 * Bookshelf.Model, and provides several basic behaviours, as well as a set of Data methods for accessing information
 * from the database.

 * The models are internal to Dating-With-Node, only the API and some internal functions such as migration accesses
 * the models directly. All other parts of Dating-With-Node are only allowed to access data via the API.
 */
var schema = require('../schema/dating-with-node');
var _ = require('lodash');

// Load the registry plugin, which helps us avoid circular dependencies
baseModel.plugin('registry');

// The Base Model which other Dating-With-Node objects will inherit from,
// including some convenience functions as static properties on the model.
baseModel.Model = baseModel.Model.extend({
	//object properties
	hasTimestamps: true,

	// Get permitted attributes from server/data/schema.js, which is where the DB schema is defined
    permittedAttributes: function () {
        return _.keys(schema.tables[this.tableName]);
    },

},{
	//static properties
});

// Export baseModel for use elsewhere
module.exports = baseModel;