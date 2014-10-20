'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = null;

exports.register = function (plugin, options, next) {
	mandrill_client = new mandrill.Mandrill(options.apiKey);
	plugin.expose('mandrill_client', mandrill_client);
    next();
};

exports.register.attributes = {
    name: 'mailer'
};