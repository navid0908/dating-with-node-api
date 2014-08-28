module.exports = exports = function () {
    return [
        {
            method: 'get',
            path: '/users',
            handler: function(request, reply) {
                reply([]);
            }
        }
    ];
}