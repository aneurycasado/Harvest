'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            default: 'http://www.thecatholicfoundation.com/wp-content/uploads/2012/03/new-harvest.jpg'
        },
        cartQuantity: {
            type: Number,
            required: true
        }
    }],
    orderTotal: {
        type: Number
    },
    shippingAddress: {
        type: String
    },
    dateOfOrder: {
        type: Date,
        default: new Date()
    },
    promoCode: {
        type: String
    },
    discountApplied: {type: Number},
    status: {
        type: String,
        default: "Created",
        enum: statuses
    }
});

var statuses = ["Created", "Processing", "Completed", "Cancelled"];

mongoose.model('Order', schema);
