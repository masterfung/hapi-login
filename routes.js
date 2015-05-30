var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');

/**
 * Contains the list of all routes and associate methods in Pages import
 */
exports.endpoints = [
	{ method: 'GET',    path: '/',               config: Pages.index    },
	{ method: 'GET',    path: '/login',          config: Pages.login    },
	{ method: 'GET',    path: '/signup',         config: Pages.signup },
	{ method: 'GET',    path: '/dashboard',      config: Pages.secret   },

	{ method: 'POST',   path: '/login',          config: Authentication.login },
	{ method: 'GET',    path: '/logout',         config: Authentication.logout },
	{ method: 'POST',   path: '/signup',         config: Authentication.signup },
	{ method: 'GET',    path: '/{param*}',       config: Pages.assets }
];
