'use strict';

exports.register = function (plugin, options, next) {
  var knex = require('knex')(options); //pass in db config options.
  var Bookshelf = require('bookshelf');
  var Bookshelf.dbh = Bookshelf(knex); // Initializes a new Bookshelf instance

  var models = {
          Base : require('../../database/models/base'),
          Authattempt : require('../../database/models/authattempt'),
          Activelevel : require('../../database/models/activelevel'),
          Astrologicalsign : require('../../database/models/astrologicalsign'),
          Block : require('../../database/models/block'),          
          Bodytype : require('../../database/models/bodytype'),
          Buzzline : require('../../database/models/buzzline');
          Children : require('../../database/models/children'),
          Country : require('../../database/models/country'),
          Diet : require('../../database/models/diet'),
          Drink : require('../../database/models/drink'),
          Drug : require('../../database/models/drug'),
          Education : require('../../database/models/education'),
          Invitation : require('../../database/models/invitation'),
          Location : require('../../database/models/location'),
          Logvisit : require('../../database/models/logvisit'),
          Photo : require('../../database/models/photo'),
          Phototype : require('../../database/models/phototype'),
          Profession : require('../../database/models/profession'),
          Profile : require('../../database/models/profile'),
          Relationshipstatus : require('../../database/models/relationshipstatus'),
          Smoke : require('../../database/models/smoke'),
          User : require('../../database/models/user'),
        };
  
    Object.keys(models).forEach(function (model) {
      plugin.expose(model, models[model]);
    });

    next();
};

exports.register.attributes = {
    name: 'models'
};