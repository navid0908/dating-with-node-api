/**
* @description - The purpose of this model is to store information about various photos a user uploads.
*/

var baseModel = require('./base');
var Photo;
var Photos;

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
        // Relations
        user_id: function () {
            return this.belongsTo('User', 'user_id');
        },
        /**
         * [unsetOldPrimaryPhoto This function makes any exisiting primary photo to not primary.]
         */
        unsetOldPrimaryPhoto: function(){
            return baseModel.knex(this.tableName).update({is_primary:0}).where({user_id:this.id});
        }
    });

    Photos = baseModel.Collection.extend({
        model: Photo
    });

module.exports = {
    Photo: baseModel.model('Photo', Photo),
    Photos: baseModel.collection('Photos', Photos)
};