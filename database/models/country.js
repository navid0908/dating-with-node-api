module.exports = function (db, cb) {
    db.define('country', {        
        id               : { type: "serial", key: true }, // autoincrementing primary key
        code             : { type: 'text', size: 2},
        name             : { type: 'text', size: 100},
        }, {
        methods: {
            getId : function(){
                return this.id;
            },
            getCode: function () {
                return this.code;
            },
            getName: function () {
                return this.name;
            },
            serialize: function () {
                return {
                    id              : this.id,
                    code            : this.code,
                    name            : this.name,
                };
            }
        }
    });
    
}