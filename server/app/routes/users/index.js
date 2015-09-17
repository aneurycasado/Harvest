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