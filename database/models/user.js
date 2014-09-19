module.exports = function (db, cb) {
    db.define('user', {        
        id:                     { type: "serial", key: true }, // autoincrementing primary key
        username:               { type: 'text', size: 30, required: true },
        email:                  { type: 'text', size: 60},
        password:               { type: 'text', size: 60},
        salt:                   { type: 'text', size: 60},
        group_id:               { type: 'integer', length: 3}, //10=regular-user, 100=admin
        social_login_type:      { type: 'text', length: 20}, //facebook,twitter,instagram,google
        social_login_token:     { type: 'text', length: 60},
        status:                 { type: 'integer', length: 10},
        created:                { type: 'date', time:true},
        modified:               { type: 'date', time:true},
        }, {
        methods: {
            getId : function(){
                return this.id;
            },
            getUsername: function () {
                return this.username;
            },
            getEmail: function () {
                return this.email;
            },
            getPassword: function () {
                return this.password;
            },
            getSalt: function () {
                return this.salt;
            },
            getGroupId: function () {
                return this.group_id;
            },
            getSocialLoginType: function () {
                return this.social_login_type;
            },
            getSocialLoginToken: function () {
                return this.social_login_token;
            },
            getStatus: function () {
                return this.status;
            },
            getCreated: function () {
                return this.created;
            },
            getModified: function () {
                return this.modified;
            },
            serialize: function () {
                return {
                    id:                     this.id,
                    username:               this.username,
                    email:                  this.email,
                    password:               this.password,
                    salt:                   this.salt,
                    group_id:               this.group_id,
                    social_login_type:      this.social_login_type,
                    social_login_token:     this.social_login_token,
                    status:                 this.status,
                    created:                this.created,
                    modified:               this.modified
                };
            }
        }
    });
}