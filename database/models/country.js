/**
 * @description This model is a lookup table for the various countries.
 */

var baseModel = require('./base');
var Country;

Country = baseModel.Model.extend({
  tableName: 'country'
});

module.exports = baseModel.model('Country', Country);
