var baseModel = require('./base');
var Logvisit;

Logvisit = baseModel.Model.extend({
  tableName: 'logvisit'
});

module.exports = baseModel.model('Logvisit', Logvisit);
