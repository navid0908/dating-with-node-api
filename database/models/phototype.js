var baseModel = require('./base');
var Phototype;

Phototype = baseModel.Model.extend({
  tableName: 'phototype'
});

module.exports = baseModel.model('Phototype', Phototype);
