'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	items: [{
		title: {type: String, unique: true, required: true},
		description: {type: String, required: true},
		category: {type: String, required: true},
		photo: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
		finalPrice: {type: Number, required: true},
		quantityOrdered: {type: Number, required: true },
	}],
	orderTotal: {type: Number},
	shippingAddress: {type: String, required: true},
	dateOfOrder: {type: Date, default: new Date()},
	discounts: [{type: String}],
});

schema.pre('save', function (next) {
	var total = 0;
	this.items.forEach(function (item) {
		total += item.finalPrice * item.quantityOrdered;
	});
	this.orderTotal = total;
});

mongoose.model('Order', schema);