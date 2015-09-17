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

router.put('/', function (req, res, next) {
  console.log(req.body);
  Review.findOne({_id: req.body._id})
    .then(function (review) {
      for (var k in req.body) {
        review[k] = req.body[k];
      }
      return review.save();
    })
    .then(function (savedReview) {
      res.json(savedReview);
    })
    .then(null, next);
});

router.get('/:productID', function (req, res, next) {
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
