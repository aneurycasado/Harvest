'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	items: [{
		title: {type: String, required: true},
		description: {type: String, required: true},
		price: {type: Number, required: true},
		category: {type: String, required: true},
		photo: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
		cartQuantity: {type: Number, required: true }
	}],
	orderTotal: {type: Number},
	shippingAddress: {type: String},
	dateOfOrder: {type: Date, default: new Date()},
	discounts: [{type: String}],
});

// schema.pre('save', function (next) {
// 	var total = 0;
// 	console.log('executing pre save hook...');
// 	this.items.forEach(function (item) {
// 		total += item.finalPrice * item.quantityOrdered;
// 	});
// 	this.orderTotal = total;
// 	next();
// });

mongoose.model('Order', schema);
