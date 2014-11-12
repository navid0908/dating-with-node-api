var models;
models = {
    init: function (options) {
		var self = this;
		var knex = require('knex')(options); //pass in db config options.
		var Bookshelf = require('bookshelf');
		Bookshelf.dbh = Bookshelf(knex);


        // One off inclusion of Base file.
		self.Base = require('./models/base');
		self.Authattempt = require('./models/authattempt');
		self.Activelevel = require('./models/activelevel');
		self.Bodytype = require('./models/bodytype');
		self.Children = require('./models/children');
		self.Country = require('./models/country');
		self.Diet = require('./models/diet');
		self.Drink = require('./models/drink');
		self.Drug = require('./models/drug');
		self.Education = require('./models/education');
		self.Smoke = require('./models/smoke');
		self.User = require('./models/user');
    }
};

module.exports = models;
