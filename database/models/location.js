var baseModel = require('./base');
var Locaiton;

Locaiton = baseModel.Model.extend({
  tableName: 'location'
});

module.exports = baseModel.model('Locaiton', Locaiton);
