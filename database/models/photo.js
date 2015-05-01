/**
* @description - The purpose of this model is to store information about various photos a user uploads.
*/

var baseModel = require('./base');
var Photo;

    Photo = baseModel.Model.extend({
        tableName: 'photo',
        hasTimestamps: ['created_at', 'updated_at'],
        defaults: function() {
            return {
                // default values for when the record is created.
                is_primary: 0,
                phototype_id: 1
            }
        },
        user : function(){
            var User = require('./user');
            return this.belongsTo('User');
        },
    });

module.exports = baseModel.model('Photo', Photo);