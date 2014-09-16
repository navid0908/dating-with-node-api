module.exports = function (db, cb) {
    db.define('education', {        
        id               : { type: "serial", key: true }, // autoincrementing primary key
        description      : { type: 'text', size: 45, required: true }
        }, {
        methods: {
            getId : function(){
                return this.id;
            },
            getDescription: function () {
                return this.description;
            },
            serialize: function () {
                return {
                    id              : this.id,
                    description     : this.description
                };
            }
        }
    });
}