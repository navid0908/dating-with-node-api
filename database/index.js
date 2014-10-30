var models;
models = {
    init: function () {
        var self = this;

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
