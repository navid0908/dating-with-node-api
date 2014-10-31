var baseModel = require('./base');
var Bodytype;

Bodytype = baseModel.Model.extend({
  tableName: 'bodytype'
});

module.exports = baseModel.model('Bodytype', Bodytype);