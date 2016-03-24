var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Task Model
 * ==========
 */

var Task = new keystone.List('Task');

Task.add({
	name:			{ type: Types.Text, required: true, index: true },
	price:			{ type: Types.Number, initial: 0 },
	description:	{ type: Types.Textarea },
	hoursRequired:	{ type: Types.Number, initial: 1 }
});

Task.relationship({ ref: 'Job', path: 'jobs', refPath: 'tasks' });

Task.defaultColumns = 'name, description, price';
Task.register();
