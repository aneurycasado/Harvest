'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = router;
var _ = require('lodash');

router.get('/', function (req, res, next) {
    User.find().exec()
    .then(function (users) {
        res.json(users);
    })
    .then(null, next);
});

router.put('/', function (req, res, next) {
	User.findById(req.body._id)
		.then(function (user) {
			for (var k in req.body) {
				user[k] = req.body[k];
			}
			return user.save();
		})
		.then(function (savedUser) {
			res.json(savedUser);
		})
		.then(null, next);
});

router.delete('/', function (req, res, next) {
	User.remove({_id: req.body._id})
		.then(function (deletedUser) {
			res.json(deletedUser);
		})
		.then(null, next);
});

router.post('/', function (req, res, next) {
	User.create(req.body) 
		.then(function (createdUser){
			res.json(createdUser);
		})
		.then(null, next);
});