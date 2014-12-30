var models;
models = {
    init: function (options) {
		var self = this;
		var knex = require('knex')(options); //pass in db config options.
		var Bookshelf = require('bookshelf');
		Bookshelf.dbh = Bookshelf(knex); // Initializes a new Bookshelf instance


        // One off inclusion of Base file.
		self.Base = require('./models/base');
		self.Authattempt = require('./models/authattempt');
		self.Activelevel = require('./models/activelevel');
		self.Astrologicalsign = require('./models/astrologicalsign');
		self.Block = require('./models/block');
		self.Bodytype = require('./models/bodytype');
		self.Buzzline = require('./models/buzzline');
		self.Children = require('./models/children');
		self.Country = require('./models/country');
		self.Diet = require('./models/diet');
		self.Drink = require('./models/drink');
		self.Drug = require('./models/drug');
		self.Education = require('./models/education');
		self.Invitation = require('./models/invitation');
		self.Invitationcode = require('./models/invitationcode');
		self.Location = require('./models/location');
		self.Logvisit = require('./models/logvisit');
		self.Photo = require('./models/photo');
		self.Phototype = require('./models/phototype');
		self.Profession = require('./models/profession');
		self.Profile = require('./models/profile');
		self.Relationshipstatus = require('./models/relationshipstatus');
		self.Smoke = require('./models/smoke');
		self.User = require('./models/user');
    }
};

module.exports = models;
