var keystone = require('keystone');

exports = module.exports = function(req, res) {
	keystone.list('Task').model
		.find()
		.select('name description price')
		.exec(function(err, results) {
			res.json(results);
	});
};
