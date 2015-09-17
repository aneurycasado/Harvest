'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
module.exports = router;
var _ = require('lodash');


router.get('/', function (req, res, next) {
    Review.find().populate('product author').exec()
    .then(
      function(reviews){
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
        res.json(reviews);
      }
    )
    .then(null, function (error) {
        next(error);
    });
});

router.post('/:productID', function (req, res) {
    console.log("The user");
    console.log(req.user);
    req.body.author = req.user;
    console.log("The review before");
    console.log(req.body);
    Review.create(req.body)
    .then(function(createdReview){
      console.log("The created review ", createdReview);
      res.json(createdReview);
    })
    .then(null, function (error) {
      next(error);
    });
  });
