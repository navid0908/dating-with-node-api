/**
* @description - The purpose of this model is to store information about various answers to questions related a user.
*/

var baseModel = require('./base');
var Profileanswer;

    Profileanswer = baseModel.Model.extend({
        tableName: 'profileanswer',
        hasTimestamps: ['created_at', 'updated_at'],
        profile : function(){
            var User = require('./profile');
            return this.belongsTo('Profile');
        },
    });

module.exports = baseModel.model('Profileanswer', Profileanswer);