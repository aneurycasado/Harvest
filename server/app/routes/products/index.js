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
        for (var k in req.body) {
            if (product[k]) {
                product[k] = req.body[k];
            }
        }
        product.save().then(function (savedProduct) {
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

function subString(haystack, needle) {
    var found = false;
    for (var i = 0; i <= haystack.length - needle.length; i++) {
        for (var j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                break;
            }
            if (j === needle.length - 1) {
                found = true;
            }
        }
    }
    return found;
}

router.get('/search/:searchStr', function (req, res, next) {

    Product.find()
        .then(function (products) {
            var filteredProducts = [];
            products.forEach(function (product) {
                if (subString(product.title, req.params.searchStr)) {
                    filteredProducts.push(product);
                }
            });
            res.json(filteredProducts);
        })
        .then(null, next);
});
