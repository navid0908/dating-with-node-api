// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'get',
        path: '/bodytype',
        config: controllers.bodytypeController.get
    }
];