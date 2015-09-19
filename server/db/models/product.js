'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {type: String, unique: true, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	inventoryQuantity: {type: Number, required: true },
	category: {type: String, required: true},
	available: {type: Boolean, default: true},
	numReviews: {type: Number, default: 0},
	percentageLiked: {type: Number, default: 1},
	photo: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
	photo2: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
	photo3: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
	photo4: {type: String, default: 'http://piq.codeus.net/static/media/userpics/piq_89071_400x400.png'},
});

mongoose.model('Product', schema);
