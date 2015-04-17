// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/lookup/activelevel',
        config: controllers.lookupController.activelevel.get
    },
    {
        method: 'get',
        path: '/lookup/astrologicalsign',
        config: controllers.lookupController.astrologicalsign.get
    },
    {
        method: 'get',
        path: '/lookup/bodytype',
        config: controllers.lookupController.bodytype.get
    },
    {
        method: 'get',
        path: '/lookup/buzzline',
        config: controllers.lookupController.buzzline.get
    },
    {
        method: 'get',
        path: '/lookup/children',
        config: controllers.lookupController.children.get
    },
    {
        method: 'get',
        path: '/lookup/country',
        config: controllers.lookupController.country.get
    },
    {
        method: 'get',
        path: '/lookup/diet',
        config: controllers.lookupController.diet.get
    },
    {
        method: 'get',
        path: '/lookup/drink',
        config: controllers.lookupController.drink.get
    },
    {
        method: 'get',
        path: '/lookup/drug',
        config: controllers.lookupController.drug.get
    },
    {
        method: 'get',
        path: '/lookup/education',
        config: controllers.lookupController.education.get
    },
    {
        method: 'get',
        path: '/lookup/phototype',
        config: controllers.lookupController.phototype.get
    },
    {
        method: 'get',
        path: '/lookup/profession',
        config: controllers.lookupController.profession.get
    },
    {
        method: 'get',
        path: '/lookup/relationshipstatus',
        config: controllers.lookupController.relationshipstatus.get
    },    
    {
        method: 'get',
        path: '/lookup/smoke',
        config: controllers.lookupController.smoke.get
    },
    {
        method: 'get',
        path: '/lookup/question',
        config: controllers.lookupController.question.get
    },
];