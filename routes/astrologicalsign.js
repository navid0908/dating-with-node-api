// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/astrologicalsign',
        config: controllers.astrologicalsignController.get
    }
];