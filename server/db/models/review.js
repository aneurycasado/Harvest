'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
	title: {type: String, required: true},
	content: {type: String, required: true, min: 140},
	thumbsUp: {type: Boolean, required: true}
});

mongoose.model('Review', schema);