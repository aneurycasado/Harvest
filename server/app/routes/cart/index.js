'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
module.exports = router;

router.put("/:productID", function(req,res,next){
	var userID = req.user.id;
	console.log(userID);
	res.send();
});
