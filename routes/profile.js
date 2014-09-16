// API Server Endpoints

module.exports = exports = [
    {
        method: 'get',
        path: '/profiles',
        config: {
            handler: function(request, reply) {
                reply([]);
            },
            description: "Obtain user profile",
            tags: ['user', 'profile']
        }
    }
];