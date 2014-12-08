/**
 * @description - This is the model from which all other Dating-With-Node models extend. The model is based on
 * Bookshelf.Model, and provides several basic behaviours, as well as a set of Data methods for accessing information
 * from the database.

 * The models are internal to Dating-With-Node, only the API and some internal functions such as migration accesses
 * the models directly. All other parts of Dating-With-Node are only allowed to access data via the API.
 */

var schema = require('../schema/dating-with-node');
var _ = require('lodash');
var baseModel = require('bookshelf').dbh;

	// Load the registry plugin, which helps us avoid circular dependencies
	baseModel.plugin('registry');

	// The Base Model which other Dating-With-Node objects will inherit from,
	// including some convenience functions as static properties on the model.
	baseModel.Model = baseModel.Model.extend({
		//object properties
		hasTimestamps: true,

		//mapping column names from x to y
		columnMappings: {},

		// Get permitted attributes from server/data/schema.js, which is where the DB schema is defined
		permittedAttributes: function () {
			return _.keys(schema[this.tableName]);
		},
		toJSON: function (options) {
			var attrs = _.extend({}, this.attributes);
			var self = this;
			options = options || {};

			if (options && options.shallow) {
				return attrs;
			}

			if (options && options.idOnly) {
				return attrs.id;
			}

			if (options && options.include) {
				this.include = _.union(this.include, options.include);
			}

			_.each(this.relations, function (relation, key) {
				if (key.substring(0, 7) !== '_pivot_') {
					// if include is set, expand to full object
					// 'toMany' relationships are included with ids if not expanded
					var fullKey = _.isEmpty(options.name) ? key : options.name + '.' + key;
					if (_.contains(self.include, fullKey)) {
						attrs[key] = relation.toJSON({name: fullKey, include: self.include});
					} else if (relation.hasOwnProperty('length')) {
						attrs[key] = relation.toJSON({idOnly: true});
					}
				}
			});
			return attrs;
		},
	},{
		/**
		 * Returns an array of keys permitted in every method's `options` hash.
		 * Can be overridden and added to by a model's `permittedOptions` method.
		 * @return {Array} Keys allowed in the `options` hash of every model's method.
		 */
		permittedOptions: function () {
			// terms to whitelist for all methods.
			return ['context', 'include', 'transacting'];
		},
		/**
		* Allows you to map data passed into the model to be associated to a different column.
		* @param {Object} data has keys representing the model's attributes/fields in the database.
		* @return {Object} The mapped results of the passed in data, containing the new names.
		*/
		mapData: function (data) {
			data = data || {};
			var transformAttributes = this.prototype.columnMappings || {};
			_.each(transformAttributes, function(value, key){
				if(data.hasOwnProperty(key)){
					data[value] = data[key];
					delete data[key];
				}
			});
			return data;
		},
		/**
		* Filters potentially unsafe model attributes, so you can pass them to Bookshelf / Knex.
		* @param {Object} data Has keys representing the model's attributes/fields in the database.
		* @return {Object} The filtered results of the passed in data, containing only what's allowed in the schema.
		*/
		filterData: function (data) {
			data = data || {};
			var permittedAttributes = this.prototype.permittedAttributes();
			var filteredData = _.pick(data, permittedAttributes);

			return filteredData;
		},
		/**
		* Filters potentially unsafe `options` in a model method's arguments, so you can pass them to Bookshelf / Knex.
		* @param {Object} options Represents options to filter in order to be passed to the Bookshelf query.
		* @param {String} methodName The name of the method to check valid options for.
		* @return {Object} The filtered results of `options`.
		*/
		filterOptions: function (options, methodName) {
			options = options || {};
			var permittedOptions = this.permittedOptions(methodName);
			var filteredOptions = _.pick(options, permittedOptions);

			return filteredOptions;
		},
		// ## Model Data Functions

		/**
		* ### Find One
		* Naive find one where data determines what to match on
		* @param {Object} data
		* @param {Object} options (optional)
		* @return {Promise(baseModel.Model)} Single Model
		*/
		findOne: function (data, options) {
			data = data || {};
			options = options || {};

			data = this.mapData(data);
			data = this.filterData(data);
			options = this.filterOptions(options, 'findOne');

			// We pass include to forge so that toJSON has access
			return this.forge(data, {include: options.include}).fetch(options);
		},
		/**
		* ### Find All
		* Naive find all fetches all the data for a particular model
		* @param {Object} options (optional)
		* @return {Promise(baseModel.Collection)} Collection of all Models
		*/
		findAll:  function (options) {
			options = options || {};
			options = this.mapData(options);
			options = this.filterOptions(options, 'findAll');
			return baseModel.Collection.forge([], {model: this}).fetch(options).then(function (result) {
				if (options.include) {
					_.each(result.models, function (item) {
						item.include = options.include;
					});
				}
				return result;
			});
		},
		/**
		* ### Add
		* Naive add
		* @param {Object} data
		* @param {Object} options (optional)
		* @return {Promise(baseModel.Model)} Newly Added Model
		*/
		add: function (data, options) {
			data = data || {};
			options = options || {};

			//Note: the below assignments are not necessary as its passed by reference.
			data = this.mapData(data);
			data = this.filterData(data);
			options = this.filterOptions(options, 'add');
			var model = this.forge(data);

			// We allow you to disable timestamps when importing data so that the new models `updated_at` value is the same
			// as the import json blob.
			if (options.importing) {
				model.hasTimestamps = false;
			}
			return model.save(null, options);
		},
		/**
		* ### Edit
		* Naive edit
		* @param {Object} data
		* @param {Object} options (optional)
		* @return {Promise(baseModel.Model)} Edited Model
		*/
		edit: function (data, options) {
			data = data || {};
			options = options || {};

			var id = options.id;
			data = this.mapData(data);
			data = this.filterData(data);
			options = this.filterOptions(options, 'edit');

			return this.forge({id: id}).fetch(options).then(function (object) {
				if (object) {
					return object.save(data, options);
				}
			});
		},
		/**
		* ### Destroy
		* Naive destroy
		* @param {Object} options (optional)
		* @return {Promise(baseModel.Model)} Empty Model
		*/
		destroy: function (options) {
			options = options || {};

			var id = options.id;
			options = this.filterOptions(options, 'destroy');
			return this.forge({id: id}).destroy(options);
	    },
	});

// Export baseModel for use elsewhere
module.exports = baseModel;