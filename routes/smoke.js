// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/smoke',
        config: controllers.smokeController.get
    }
];