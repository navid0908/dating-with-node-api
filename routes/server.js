// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/server-status',
        config: controllers.serverController.status
    }
];