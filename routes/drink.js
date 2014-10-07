// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/drink',
        config: controllers.drinkController.get
    }
];