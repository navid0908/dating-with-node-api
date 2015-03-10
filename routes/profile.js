// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'put',
        path: '/profile/{id}',
        config: controllers.profileController.update
    },
];