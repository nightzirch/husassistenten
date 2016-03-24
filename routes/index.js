var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get(['/bestill', '/order'], routes.views.order);
	app.get(['/tjenester', '/services'], routes.views.services);
	app.get(['/om-husassistenten', '/about'], routes.views.about);
	app.get(['/sporsmal-og-svar', '/faq'], routes.views.faq);

	// API
	app.get('/api/assistants', routes.api.assistants);
	app.get('/api/customers', routes.api.customers);
	app.get('/api/tasks', routes.api.tasks);

	// Disabled views
	// app.get('/blog/:category?', routes.views.blog);
	// app.get('/blog/post/:post', routes.views.post);
	// app.get('/gallery', routes.views.gallery);
	// app.all('/contact', routes.views.contact);

};
