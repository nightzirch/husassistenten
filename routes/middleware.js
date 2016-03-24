var _ = require('underscore');


/**
	Initialises the standard view locals
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = {
		left: [
			{ label: 'Bestill',				key: 'order',		href: '/bestill' },
			{ label: 'Tjenester og priser',	key: 'services',	href: '/tjenester' }
		],
		right: [
			{ label: 'Om Husassistenten',	key: 'about',		href: '/om-husassistenten' },
			{ label: 'Kundesenter',			key: 'faq',			href: '/sporsmal-og-svar' }
		]
	};

	locals.user = req.user;

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
