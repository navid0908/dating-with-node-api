// API Server Endpoints

module.exports = exports = [
    {
        method: 'get',
        path: '/users',
        config: {
            handler: function(request, reply) {
                reply([]);
            },
            description: "Obtain user data",
            tags: ['user']
        }
    }
];