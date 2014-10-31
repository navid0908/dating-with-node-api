var baseModel = require('./base');
var Country;

Country = baseModel.Model.extend({
  tableName: 'country'
});

module.exports = baseModel.model('Country', Country);
