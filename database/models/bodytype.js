/**
 * @description This model is a lookup table for the various Body types.
 */

var baseModel = require('./base');
var Bodytype;

Bodytype = baseModel.Model.extend({
  tableName: 'bodytype'
});

module.exports = baseModel.model('Bodytype', Bodytype);