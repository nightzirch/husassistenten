var keystone = require('keystone');

exports = module.exports = function(req, res) {
	keystone.list('User').model
		.find({isAssistant: true})
		.sort('created')
		.select('name')
		.exec(function(err, results) {
			res.json(results);
	});
};
