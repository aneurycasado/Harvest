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
        res.json(reviews);
    })
    .then(null, next);
});

router.put('/', function (req, res, next) {
  Review.findOne({_id: req.body._id})
    .then(function (review) {
      _.merge(review, req.body);
      return review.save()
    })
    .then(function (savedReview) {
      res.json(savedReview);
    })
    .then(null, next);
});

router.get('/:productID', function (req, res, next) {
    Review.find({product: req.params.productID}).populate('author')
    .then(function(reviews){
      res.json(reviews);
    })
    .then(null, next);
});
router.post('/', function (req, res, next) {
    req.body.author = req.user;
    Review.create(req.body)
    .then(function (createdReview) {
        res.json(createdReview);
    })
    .then(null, function (error) {
        next(error);
    });
});
