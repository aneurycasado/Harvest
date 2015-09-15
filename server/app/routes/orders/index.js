'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
module.exports = router;

router.get("/user", function(req,res,next){
	Order.find().exec()
	.then(function(userOrders){
		res.send(userOrders);
	})
	.then(null,next);
});