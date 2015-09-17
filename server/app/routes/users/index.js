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
