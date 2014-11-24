/**
 * @description This model stores information about various photos a user uploads.
 */

var datingWithNode = require('./base');
var Photo;

Photo = datingWithNode.Model.extend({
    tableName: 'photo',
    hasTimestamps: ['created_at', 'updated_at'],
    defaults: function() {
       return {
         // default values for when the record is created.
         status: 'ative',
       }
    },
    user : function(){
        var User = require('./user');
        return this.belongsTo('User');
    },
});

module.exports = datingWithNode.model('Photo', Photo);