'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


var schema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
	title: {type: String, required: true},
	content: {type: String, required: true, min: 140},
	thumbsUp: {type: Boolean, required: true}
});

mongoose.model('Review', schema);

schema.post('save', function(doc){
	return Product.findOne({_id: doc.product}).exec()
	.then(function(prod){
		var liked = doc.thumbsUp ? 1 : 0;
		console.log("before add: ", prod.numReviews);
		prod.percentageLiked = 
		(Math.round(prod.percentageLiked*prod.numReviews)+liked) / (prod.numReviews+1);
		prod.numReviews = prod.numReviews+1;
		console.log("after add: ", prod.numReviews);
		return prod.save();
	})
	.then(function(prod){
		console.log("after save: ", prod.numReviews);
		return doc;
	});
});