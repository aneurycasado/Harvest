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
  },
	styles:{
		navBar: {
			type: String,
			default: ''
		},
		pageText:{
			type: String,
			default: ''
		},
		filter: {
			type: String,
			default: ''
		},
		backgroundColor: {
			type: String,
			default: ''
		},
		footer: {
			type: String,
			default: ''
		},
		productSize: {
			type: String,
			default: ''
		},
		logoSize: {
			type: String,
			default: ''
		},
		buttonShape: {
			type: String,
			default: ''
		},

	}
});

mongoose.model('Farm', farmSchema);
