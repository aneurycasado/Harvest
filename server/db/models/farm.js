var mongoose = require('mongoose');

var farmSchema = new mongoose.Schema({
	name: {type: String},
	description: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    photo: {
        type: String
    }
});

mongoose.model('Farm', farmSchema);
