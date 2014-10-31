var baseModel = require('./base');
var Activelevel;

Activelevel = baseModel.Model.extend({
  tableName: 'activelevel'
});

module.exports = baseModel.model('Activelevel', Activelevel);
