var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	created: { type: Types.Datetime, initial: Date.now() },
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, index: true },
	isAssistant: { type: Boolean, index: true },
	isCustomer: { type: Boolean, index: true }
});

User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

User.relationship(
	{ ref: 'Post', path: 'posts', refPath: 'author' },
	{ ref: 'Job', path: 'jobs', refPath: 'assistant' },
	{ ref: 'Job', path: 'jobs', refPath: 'customer' }
);

User.defaultColumns = 'name, email, isAdmin';
User.register();
