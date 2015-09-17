'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
module.exports = router;

router.get("/", function(req,res,next){
	Order.find().populate('user').exec()
	.then(function(orders){
		res.send(orders);
	})
	.then(null,next);
});

router.get("/all/user", function(req,res,next){
	Order.find({user : req.user._id}).exec()
	.then(function(userOrders){
		res.send(userOrders);
	})
	.then(null,next);
});


router.get("/:id", function(req,res,next){
	console.log("Correct router");
	Order.findOne({_id : req.params.id}).exec()
	.then(function(order){
		res.json(order);
	})
	.then(null,next);
});


router.post("/:userID", function(req,res,next){
	if(req.params.userID === 'guest' && !req.user){
		User.create({'type': 'guest'})
		.then(function(createdUser){
			req.body.user = createdUser._id;
			return createdUser;
		})
		.then(function(user){
			console.log("About to create the order with ", req.body);
			return Order.create(req.body)
		})
		.then(function(newOrder){
				res.json(newOrder);
		})
		.then(null,next);
	}else{
		if(req.params.userID === 'guest'){
			console.log("User id ", req.user._id);
			req.body.user = req.user._id;
		}
		Order.create(req.body)
		.then(function(createdOrder){
			console.log(createdOrder);
			res.json(createdOrder);
		});
	}
});
