"use strict";

const Nodebb = require('./nodebb');


const controllers = require('./controllers');
const categories = require('./categories');
const routes = require('./routes');

plugin = {};

plugin.init = function (params, callback) {
	const { app, middleware, router } = params;
	categories.init();
	controllers.init(params);
	routes(app, middleware, router);

	callback();
};

plugin.prepare = function(hotswapIds, callback) {
	hotswapIds.push("wiki-pages");
	callback(null, hotswapIds);
};
plugin.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/wiki',
		icon: 'fa-tint',
		name: 'Wikipedia'
	});

	callback(null, header);
};

module.exports = plugin;