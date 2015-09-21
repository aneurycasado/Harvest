'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	contents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

mongoose.model('Cart', schema);