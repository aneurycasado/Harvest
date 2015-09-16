'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
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
    Review.find().populate('author').exec()
    .then(
      function(reviews){
        console.log(reviews);
        res.json(reviews);
      }
    )
    .then(null, function (error) {
        next(error);
    });
});

router.get('/:productID', ensureAuthenticated, function (req, res) {
    Review.find({product: req.params.productID}).populate('author')
    .then(
      function(reviews){
        console.log(reviews);
        res.json(reviews);
      }
    )
    .then(null, function (error) {
        next(error);
    });
});
