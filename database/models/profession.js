var baseModel = require('./base');
var Profession;

Profession = baseModel.Model.extend({
  tableName: 'profession'
});

module.exports = baseModel.model('Profession', Profession);
