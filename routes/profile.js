module.exports = exports = function () {
    return [
        {
            method: 'get',
            path: '/profiles',
            handler: function(request, reply) {
                reply([]);
            }
        }
    ];
}