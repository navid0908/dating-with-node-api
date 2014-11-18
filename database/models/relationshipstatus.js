var baseModel = require('./base');
var Relationshipstatus;

Relationshipstatus = baseModel.Model.extend({
  tableName: 'relationshipstatus'
});

module.exports = baseModel.model('Relationshipstatus', Relationshipstatus);
