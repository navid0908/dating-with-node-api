/**
 * @description This model is a lookup table for the various Diet habbits of a user.
 */

var baseModel = require('./base');
var Diet;

Diet = baseModel.Model.extend({
  tableName: 'diet'
});

module.exports = baseModel.model('Diet', Diet);
