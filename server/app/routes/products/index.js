'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Products = mongoose.model('Product');
module.exports = router;
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', ensureAuthenticated, function (req, res) {
    Products.find().then(function(products){
      res.json(products);
    });
});
