'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
module.exports = router;

	

router.put("/:productID", function (req, res, next) {
    var userID = req.user.id;
    Product.findOne({
            _id: req.params.productID
        })
        .then(function (product) {
            Cart.findOne({
                    user: userID
                })
                .then(function (cart) {
                    if (cart) {
                        cart.contents.push(product._id);
                        cart.save()
                            .then(function (savedCart) {
                                res.json(savedCart);
                            });
                    } else {
                        Cart.create({
                                user: userID
                            })
                            .then(function (newCart) {
                                newCart.contents.push(product._id);
                                newCart.save()
                                    .then(function (savedCart) {
                                        res.json(savedCart);
                                    });
                            });
                    }
                });
        }).then(null, function (error) {
            console.log(error);
            next(error);
        });
});
