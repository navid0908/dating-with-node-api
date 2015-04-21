var baseModel = require('./base');
var async = require('async');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var _ = require('lodash');
var bcryptSaltLen = 10;
var bcryptGenSalt  = Promise.promisify(bcrypt.genSalt);
var bcryptHash     = Promise.promisify(bcrypt.hash);
var bcryptCompare  = Promise.promisify(bcrypt.compare);
var User;
    function generatePasswordHash(password) {
        // Generate a new salt
            return bcryptGenSalt(bcryptSaltLen).then(function (salt) {
                // Hash the provided password with bcrypt
                return bcryptHash(password, salt);
            });
    };

    User = baseModel.Model.extend({
        tableName: 'user',
        defaults : function(){
            return {
                // default values for when the record is created.
                status: '',
                group_id : 0, //@TODO: come up with various groups levels for users (standard, paid, admin, multiple roles?)
                social_login_type: 'email'
             }
        },
        hasTimestamps: true,
        columnMappings: {network:'social_login_type'},
        toJson: function(options){
            var attrs = baseModel.Model.prototype.toJSON.call(this, options);

            // remove password hash for security reasons
            delete attrs.password;

            return attrs;
        },
    },{
        /**
        * This function confirms the uniqueness of a username.
        * @param  {string}   userName the username we are searching for
        */
        isUsernameUnique: function(userName){
            if (!userName){
                return Promise.reject('Username is undefined');
            }
            return this.findOne({username: userName}).then(function (userRecord) {
                if(userRecord){
                    return Promise.reject('Username is taken');
                }
                return true;
            });
        },
        /**
        * This function confirms the uniqueness of an email address.
        * @param  {string}   emailAddress the email we are searching for
        */
        isEmailUnique: function(emailAddress){
            if (!emailAddress){
                return Promise.reject('Email is undefined');
            }
            return this.findOne({email: emailAddress}).then(function (userRecord) {
                if(userRecord){
                    return Promise.reject('Email is taken');
                }
                return true;
            });
        },
        /**
        * ## Add
        * Naive user add
        * Hashes the password provided before saving to the database.
        *
        * @param {object} data
        * @param {object} options
        * @extends baseModel.Model.add to manage all aspects of user signup     
        */
        add: function (data, options) {
            var self = this;
            var userData =  _.clone(data);
            userData = this.mapData(userData);
            userData = this.filterData(userData);
            options = this.filterOptions(options, 'add');

            // Generate a new password hash
            return generatePasswordHash(userData.password).then(function (hash) {
                    // Assign the hashed password
                    userData.password = hash;
                }).then(function () {
                    // Save the user with the hashed password
                    return baseModel.Model.add.call(self, userData, options);
                }).then(function (addedUser) {
                    // Assign the userData to our created user so we can pass it back
                    userData = addedUser;
                }).then(function () {
                    // find and return the added user
                    return self.findOne({id: userData.id}, options);
                }).catch(function (error) {
                    //@TODO: log db error.
                    return Promise.reject(error);
                });
        },
        // Finds the user by email, and check the password
        /**
        * ## findByCredentials
        * @param {object} data
        * @param {object} options
        */
        findByCredentials: function (data, options) {
            if(!data.email){
                return Promise.reject('Email is undefined');
            }
            if(!data.password){
                return Promise.reject('Password is undefined');
            }
            return this.findOne({email:data.email}).then(function (user) {
                if (!user) {
                    return Promise.reject('User not found');
                }
                return bcryptCompare(data.password, user.get('password')).then(function (matched) {
                    if (!matched) {
                        return Promise.reject('Email and password combination do not match.');
                    }
                    return user;
                });
            });
        },        
    });

module.exports = baseModel.model('User', User);
