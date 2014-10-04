// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/activelevel',
        config: controllers.activelevelController.get
    }
];