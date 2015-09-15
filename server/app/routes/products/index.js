'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
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
    Product.find().then(function (products) {
        res.json(products);
    });
});

router.get('/:id', ensureAuthenticated, function (req, res) {
    Product.find({
        _id: req.params.id
    }).then(function (product) {
        res.json(product[0]);
    });
});

router.get('/category/:category', ensureAuthenticated, function (req, res) {
    console.log(req.params.category);
    Product.find({
        category: req.params.category
    }).then(function (products) { 
        res.json(products);
    });
});
