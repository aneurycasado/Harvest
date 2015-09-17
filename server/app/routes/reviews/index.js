'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
module.exports = router;
var _ = require('lodash');


router.get('/', function (req, res, next) {
    Review.find().populate('product author').exec()
    .then(
      function(reviews){
        console.log('This is the check', reviews[0]);
        res.json(reviews);
      }
    )
    .then(null, function (error) {
        next(error);
    });
});

router.get('/:productID', function (req, res) {
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

router.post('/:productID', function (req, res) {
    console.log("New Review")
    console.log(req.body);
    console.log("The user");
    console.log(req.user);
    req.body.user = req.user;
    Review.create(req.body)
    .then(function(createdReview){
      console.log(createdReview);
      res.json(review);
    })
    .then(null, function (error) {
      next(error);
    });
  });
