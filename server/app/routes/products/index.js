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
        next();
    }
};

router.get('/', ensureAuthenticated, function (req, res, next) {
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

router.get('/:id', ensureAuthenticated, function (req, res, next) {
    Product.find(
      {_id: req.params.id}
    )
    .then(function (product) {
        res.json(product[0]);
    })
    .then(null, next);
});

router.put('/:id', ensureAuthenticated, function (req, res, next) {
    Product.findOne({_id: req.params.id})
    .then(function(product){
      _.merge(product, req.body);
      return product.save();
    })
    .then(function (savedProduct) {
        res.json(savedProduct);
    })
    .then(null, next);
});

router.get('/category/:category', ensureAuthenticated, function (req, res, next) {
    Product.find({
        category: req.params.category
    })
    .then(function (products) {
        res.json(products);
    })
    .then(null, next);
});


router.get('/search/:searchStr', function (req, res, next) {
    Product.find()
    .then(function (products) {
        var filteredProducts = [];
        products.forEach(function (product) {
            if (product.title.indexOf(req.params.searchStr)!==-1) {
                filteredProducts.push(product);
            }
        });
        res.json(filteredProducts);
    })
    .then(null, next);
});

