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

router.get('/', ensureAuthenticated, function (req, res, next) {
    Product.find()
    .then(function (products) {
        res.json(products);
    })
    .then(null, function (error) {
        next(error);
    });
});

router.get('/:id', ensureAuthenticated, function (req, res, next) {
    Product.find({
        _id: req.params.id
    }).then(function (product) {
        res.json(product[0]);
    }).then(null, function (error) {
        next(error);
    });
});

router.put('/:id', ensureAuthenticated, function (req, res, next) {
    Product.findOne({
        _id: req.params.id
    }).then(function (product) {
        console.log("Before ", product.inventoryQuantity);
        console.log("Change ", req.body.inventoryQuantity);
        product.inventoryQuantity = req.body.inventoryQuantity;
        product.save().then(function(savedProduct){
            console.log("Saved ", savedProduct.inventoryQuantity);
            res.json(savedProduct);
        });
    }).then(null, function (error) {
        next(error);
    });
});

router.get('/category/:category', ensureAuthenticated, function (req, res, next) {
    Product.find({
        category: req.params.category
    }).then(function (products) {
        res.json(products);
    }).then(null, function (error) {
        next(error);
    });
});
