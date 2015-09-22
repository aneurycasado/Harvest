var router = require('express').Router();
var mongoose = require('mongoose');
var Promo = mongoose.model('Promo');
var _ = require('lodash');
module.exports = router;

router.get('/', function (req, res, next) {
	Promo.find()
		.then(function (promos) {
			res.json(promos);
		})
		.then(null, next);
});

router.get('/:code', function (req, res, next) {
	Promo.find({code: req.params.code})
		.then(function (promo) {
			res.json(promo);
		})
		.then(null, next);
});

router.post('/', function (req, res, next) {
	Promo.create(req.body)
		.then(function (newPromo) {
			res.json(newPromo);
		})
		.then(null, next);
});

router.put('/:id', function (req, res, next) {
	Promo.findById(req.params.id)
		.then(function (promo) {
			_.merge(promo, req.body);
			return promo.save();
		})
		.then(function (savedPromo) {
			res.json(savedPromo);
		})
		.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	Product.remove({_id: req.params.id})
		.then(function (deletedPromo) {
			res.json(deletedPromo);
		})
		.then(null, next);
});