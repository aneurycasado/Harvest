'use strict';
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
	photo: {type: String},
	photo2: {type: String, default: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWMJegFotVq1pJ0wZ4rMZk3mZleTVWzueTzSOTdeUmzXMk88kRrQ'},
	photo3: {type: String, default: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSpLAxSjBjSIRPi2oMSO69fAB4w8NBPFt53wKvlTTNwXtgwxayuew'},
	photo4: {type: String, default: 'http://piq.codeus.net/static/media/userpics/piq_89071_400x400.png'},
});

mongoose.model('Product', schema);
