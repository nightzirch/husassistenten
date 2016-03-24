var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */

var Job = new keystone.List('Job');

Job.add({
	created:	{ type: Types.Datetime, default: Date.now(), format: 'hh:mm DD/MM/YYYY', index: true },
	customer:		{ type: Types.Relationship, ref: 'User', filters: { isCustomer: true }, index: true },
	assistant:		{ type: Types.Relationship, ref: 'User', filters: { isAssistant: true }, index: true },
	tasks:			{ type: Types.Relationship, ref: 'Task', many: true, index: true },
	amountPaid:		{ type: Types.Number, default: 0 },
	extraCost:		{ type: Types.Number, default: 0 },
	isPaid:			{ type: Types.Boolean, default: false }
});

// Currently not working. Will return 0.
Job.schema.virtual('amountOfTasks').get(function() {
	// console.log(JSON.stringify(this));
	// if (this.tasks) {
	// 	return this.tasks.length;
	// } else {
		return 0;
	// }
});

// Currently not working. Will return 0 or the value of extraCost.
Job.schema.virtual('price').get(function() {
	var price = this.extraCost ? this.extraCost : 0;
	// if (this.amountOfTasks > 0) {
	// 	for (var task in this.tasks) {
	// 		price += task.price ? task.price : 0;
	// 	}
	// }
	return price;
});

// Job.schema.virtual('isPaid').get(function() {
// 	return (this.amountPaid === this.price);
// });

Job.defaultColumns = 'created, customer, assistant, tasks, isPaid';
Job.register();
