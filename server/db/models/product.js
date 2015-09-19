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
	altPic1: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
	altPic2: {type: String, default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'},
	altPic3: {type: String, default: 'http://piq.codeus.net/static/media/userpics/piq_89071_400x400.png'},
	altPic4: {type: String, default: 'http://www.kisfarm.com/wp-content/uploads/2012/12/farm-400x400.jpg'}
});

mongoose.model('Product', schema);