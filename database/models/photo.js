var baseModel = require('./base');
var Photo;

Photo = baseModel.Model.extend({
  tableName: 'photo'
});

module.exports = baseModel.model('Photo', Photo);
