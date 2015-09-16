'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
module.exports = router;

router.get("/user", function(req,res,next){
	Order.find({user : req.user._id}).exec()
	.then(function(userOrders){
		res.send(userOrders);
	})
	.then(null,next);
});

router.post("/:userID", function(req,res,next){
	Order.create(req.body)
	.then(function(newOrder){
		res.json(newOrder);
	})
	.then(null,next);
});
