/**
 * @description This model is a lookup table for the various Photos (thumbnail, original).
 */

var baseModel = require('./base');
var Phototype;

Phototype = baseModel.Model.extend({
  tableName: 'phototype'
});

module.exports = baseModel.model('Phototype', Phototype);
