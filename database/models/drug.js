/**
 * @description This model is a lookup table for the various Drug activities of a user.
 */

var baseModel = require('./base');
var Drug;

Drug = baseModel.Model.extend({
  tableName: 'drug'
});

module.exports = baseModel.model('Drug', Drug);