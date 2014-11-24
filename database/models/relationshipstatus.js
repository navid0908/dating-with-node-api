/**
 * @description This model is a lookup table for the various Relationship statues.
 */

var baseModel = require('./base');
var Relationshipstatus;

Relationshipstatus = baseModel.Model.extend({
  tableName: 'relationshipstatus'
});

module.exports = baseModel.model('Relationshipstatus', Relationshipstatus);
