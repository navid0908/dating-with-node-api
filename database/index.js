module.exports = {
    bookshelf: null,
    models: null,

    init: function (options) {
      if (options) {
        var knex = require('knex')(options); //pass in db config options.
        this.bookshelf = require('bookshelf')(knex);

        this.models = {
          Authattempt : require('./models/authattempt')(this.bookshelf),
          Activelevel : require('./models/activelevel')(this.bookshelf),
          Bodytype : require('./models/bodytype')(this.bookshelf),
          Children : require('./models/children')(this.bookshelf),
          Country : require('./models/country')(this.bookshelf),
          Diet : require('./models/diet')(this.bookshelf),
          Drink : require('./models/drink')(this.bookshelf),
          Drug : require('./models/drug')(this.bookshelf),
          Education : require('./models/education')(this.bookshelf),
          Smoke : require('./models/smoke')(this.bookshelf),
          User : require('./models/user')(this.bookshelf),
        };
      }
    }
}