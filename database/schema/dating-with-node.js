var Schema = {        
        phototype: {
            id: {type: 'increments', nullable: false, primary: true},
            size: {type: 'string', maxlength: 45, nullable: false, unique: true},
        },
        country: {
            id: {type: 'increments', nullable: false, primary: true},
            code: {type: 'string', maxlength: 2, nullable: false},
            name: {type: 'string', maxlength: 100, nullable: false,  unique: true},
        },
        bodytype: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        diet: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        smoke: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        drug: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        drink: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        education: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        children: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        activelevel: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        astrologicalsign: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        profession: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        relationshipstatus: {
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        buzzline :{
            id: {type: 'increments', nullable: false, primary: true},
            description: {type: 'string', maxlength: 45, nullable: false},
        },
        authattempt: {
            id: {type: 'increments', nullable: false, primary: true},
            email: {type: 'string', maxlength: 60, nullable: true},
            ip: {type: 'text', maxlength: 20, nullable: false},
            created_at: {type: 'dateTime', nullable: false},
        },
        user: {
            id: {type: 'increments', nullable: false, primary: true},
            username: {type: 'string', maxlength: 30, nullable: false, unique: true},
            email: {type: 'string', maxlength: 60, nullable: true, unique: true},
            password: {type: 'text', maxlength: 60, nullable: true},
            group_id: {type: 'integer', maxlength: 2, fieldtype: 'smallint', nullable: false},
            social_login_type: {type: 'text', maxlength: 20, nullable: false},
            social_login_token: {type: 'text', maxlength: 100, nullable: true},
            status: {type: 'string', maxlength: 10, nullable: false, defaultTo: 'active'}, //pending,active,deleted
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        },
        photo: {
            id: {type: 'increments', nullable: false, primary: true},
            user_id: {type: 'integer', nullable: false, unsigned: true, references: 'user.id'},
            phototype_id: {type: 'integer', nullable: false, unsigned: true, references: 'phototype.id'},
            location: {type: 'string', maxlength: 60, nullable: false},
            caption: {type: 'string', maxlength: 140, nullable: true},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        },
        location: {
            id: {type: 'increments', nullable: false, primary: true},
            user_id: {type: 'integer', nullable: false, unsigned: true, references: 'user.id'},
            country_id: {type: 'integer', nullable: false, unsigned: true, references: 'country.id'},
            postalcode: {type: 'string', maxlength: 10, nullable: true},
            city: {type: 'string', maxlength: 45, nullable: true},
        },
        profile: {
            id: {type: 'increments', nullable: false, primary: true},
            user_id: {type: 'integer', nullable: true, unsigned: true, references: 'user.id'},
            location_id: {type: 'integer', nullable: true, unsigned: true, references: 'location.id'},
            bodytype_id: {type: 'integer', nullable: true, unsigned: true, references: 'bodytype.id'},
            diet_id: {type: 'integer', nullable: true, unsigned: true, references: 'diet.id'},
            smoke_id: {type: 'integer', nullable: true, unsigned: true, references: 'smoke.id'},
            drug_id: {type: 'integer', nullable: true, unsigned: true, references: 'drug.id'},
            drink_id: {type: 'integer', nullable: true, unsigned: true, references: 'drink.id'},
            education_id: {type: 'integer', nullable: true, unsigned: true, references: 'education.id'},
            children_id: {type: 'integer', nullable: true, unsigned: true, references: 'children.id'},
            activelevel_id: {type: 'integer', nullable: true, unsigned: true, references: 'activelevel.id'},
            astrologicalsign_id: {type: 'integer', nullable: true, unsigned: true, references: 'astrologicalsign.id'},
            profession_id: {type: 'integer', nullable: true, unsigned: true, references: 'profession.id'},
            height: {type: 'decimal', nullable: true},
            gender: {type: 'string', maxlength: 1, nullable: true},
            orientation: {type: 'string', maxlength: 1, nullable: true},
            birthday: {type: 'dateTime', nullable: false},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        },
        block: { // allows user x to block user y
            id: {type: 'increments', nullable: false, primary: true},
            user_id: {type: 'integer', nullable: false, unsigned: true, references: 'user.id'},
            block_user_id: {type: 'integer', nullable: false, unsigned: true, references: 'user.id'},
            created_at: {type: 'dateTime', nullable: false},
        },
    };
module.exports = Schema;