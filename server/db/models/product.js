'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {type: String, unique: true, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	inventoryQuantity: {type: Number, required: true },
	category: {type: String, required: true},
	photo: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
});

mongoose.model('Product', schema);