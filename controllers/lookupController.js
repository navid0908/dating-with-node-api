var models = require('../database');
var	Boom = require('boom');

var activelevel = {};
var astrologicalsign = {};
var bodytype = {};
var buzzline = {};
var children = {};
var country = {};
var diet = {};
var drink = {};
var drug = {};
var education = {};
var phototype = {};
var profession = {};
var relationshipstatus = {};
var smoke = {};

activelevel = {
	get : {
		tags: ['lookup', 'activelevel'],
		description: "Lookup for various active levels",
		handler: function (request, reply) {
			models.Activelevel.findAll().then(function(result){
				if(result){
					return reply({activelevel: result.toJSON()});
				}
				return Boom.notFound('Active levels not found');
			});
		}
	}
};
astrologicalsign = {
	get : {
		tags: ['lookup', 'astrologicalsign'],
		description: "Lookup for various astrological signs",
		handler: function (request, reply) {
			models.Astrologicalsign.findAll().then(function(result){
				if(result){
					return reply({astrologicalsign: result.toJSON()});
				}
				return Boom.notFound('Astrological Signs not found');
			});
		}
	}
};

bodytype = {
	get : {
		tags: ['lookup', 'bodytype'],
		description: "Lookup for various body types",
		handler: function (request, reply) {
			models.Bodytype.findAll().then(function(result){
				if(result){
					return reply({bodytype: result.toJSON()});
				}
				return Boom.notFound('Body types not found');
			});
		}
	}
};

buzzline = {
	get : {
		tags: ['lookup', 'buzzline'],
		description: "Lookup for various buzz lines",
		handler: function (request, reply) {
			models.Buzzline.findAll().then(function(result){
				if(result){
					return reply({buzzline: result.toJSON()});
				}
				return Boom.notFound('Buzz lines not found');
			});
		}
	}
};

children = {
	get : {
		tags: ['lookup', 'children'],
		description: "Lookup for children",
		handler: function (request, reply) {
			models.Children.findAll().then(function(result){
				if(result){
					return reply({children: result.toJSON()});
				}
				return Boom.notFound('Children types not found');
			});
		}
	}
};

country = {
	get : {
		tags: ['lookup', 'country'],
		description: "Lookup for various countries",
		handler: function (request, reply) {
			models.Country.findAll().then(function(result){
				if(result){
					return reply({country: result.toJSON()});
				}
				return Boom.notFound('Countries not found');
			});
		}
	}
};

diet = {
	get : {
		tags: ['lookup', 'diet'],
		description: "Lookup for various diets",
		handler: function (request, reply) {
			models.Diet.findAll().then(function(result){
				if(result){
					return reply({diet: result.toJSON()});
				}
				return Boom.notFound('Diet types not found');
			});
		}
	}
};

drink = {
	get : {
		tags: ['lookup', 'drink'],
		description: "Lookup for various drinking habbits",
		handler: function (request, reply) {
			models.Drink.findAll().then(function(result){
				if(result){
					return reply({drink: result.toJSON()});
				}
				return Boom.notFound('Drink types not found');
			});
		}
	}
};

drug = {
	get : {
		tags: ['lookup', 'drug'],
		description: "Lookup for various drug habbits",
		handler: function (request, reply) {
			models.Drug.findAll().then(function(result){
				if(result){
					return reply({drug: result.toJSON()});
				}
				return Boom.notFound('Drug types not found');
			});
		}
	}
};

education = {
	get : {
		tags: ['lookup', 'education'],
		description: "Lookup for various education levels",
		handler: function (request, reply) {
			models.Education.findAll().then(function(result){
				if(result){
					return reply({education: result.toJSON()});
				}
				return Boom.notFound('Education types not found');
			});
		}
	}
};

phototype = {
	get : {
		tags: ['lookup', 'phototype'],
		description: "Lookup for various phototype options",
		handler: function (request, reply) {
			models.Phototype.findAll().then(function(result){
				if(result){
					return reply({phototype: result.toJSON()});
				}
				return Boom.notFound('Photo types not found');
			});
		}
	}
};

profession = {
	get : {
		tags: ['lookup', 'profession'],
		description: "Lookup for various profession options",
		handler: function (request, reply) {
			models.Profession.findAll().then(function(result){
				if(result){
					return reply({profession: result.toJSON()});
				}
				return Boom.notFound('Profession types not found');
			});
		}
	}
};

relationshipstatus = {
	get : {
		tags: ['lookup', 'relationshipstatus'],
		description: "Lookup for various relationshipstatus options",
		handler: function (request, reply) {
			models.Relationshipstatus.findAll().then(function(result){
				if(result){
					return reply({relationshipstatus: result.toJSON()});
				}
				return Boom.notFound('Relationship status not found');
			});
		}
	}
};

smoke = {
	get : {
		tags: ['lookup', 'smoke'],
		description: "Lookup for various smoking habbits",
		handler: function (request, reply) {
			models.Smoke.findAll().then(function(result){
				if(result){
					return reply({smoke: result.toJSON()});
				}
				return Boom.notFound('Smoke types not found');
			});
		}
	}
};

exports.activelevel = activelevel;
exports.astrologicalsign = astrologicalsign;
exports.bodytype = bodytype;
exports.buzzline = buzzline;
exports.children = children;
exports.country = country;
exports.diet = diet;
exports.drink = drink;
exports.drug = drug;
exports.education = education;
exports.phototype = phototype;
exports.profession = profession;
exports.relationshipstatus = relationshipstatus;
exports.smoke = smoke;


