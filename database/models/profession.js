/**
 * @description This model is a lookup table for the various professions a user can pick.
 */

var baseModel = require('./base');
var Profession;

Profession = baseModel.Model.extend({
  tableName: 'profession'
});

module.exports = baseModel.model('Profession', Profession);
