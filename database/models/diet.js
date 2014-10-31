var baseModel = require('./base');
var Diet;

Diet = baseModel.Model.extend({
  tableName: 'diet'
});

module.exports = baseModel.model('Diet', Diet);
