// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/drug',
        config: controllers.drugController.get
    }
];