var mongoose = require('mongoose');

var promoSchema = new mongoose.Schema({
	code: {type: String, required: true},
	description: {type: String, required: true},
	discount: {type: Number, required: true},
	createdOn: {type: Date, default: new Date},
	expiresOn: {type: Date, require: true},
	validCategories: {type: String}
});

mongoose.model('Promo', promoSchema);