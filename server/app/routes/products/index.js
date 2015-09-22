'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
module.exports = router;
var _ = require('lodash');

router.param('id', function(req, res, next, id){
  Product.findById(id).then(function(product){
    req.product = product;
    next();
  });
});

router.get('/', function (req, res, next) {
    Product.find()
    .then(function (products) {
      res.json(products);
    })
    .then(null, next);
});

router.post('/', function (req, res, next) {
    Product.create(req.body)
        .then(function (product) {
            res.json(product);
        })
        .then(null, next);
});

router.delete('/', function (req, res, next) {
    Product.remove({_id: req.body._id})
        .then(function (deletedProduct) {
            res.json(deletedProduct);
        })
        .then(null, next);
});

router.get('/:id', function (req, res, next) {
    res.json(req.product);
});

router.put('/:id', function (req, res, next) {
    _.merge(req.product, req.body);
    req.product.save()
    .then(function (savedProduct) {
        res.json(savedProduct);
    })
    .then(null, next);
});

router.get('/category/:category', function (req, res, next) {
    Product.find({
        category: req.params.category
    })
    .then(function (products) {
        res.json(products);
    })
    .then(null, next);
});
