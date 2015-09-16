'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
module.exports = router;

router.get("/:userID", function (req, res, next) {
    Cart.findOne({
        user: req.params.userID
    }).populate('contents').then(function (cart) {
        res.json(cart);
    }).then(null, function (error) {
        console.error(error);
        next(error);
    });
});

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

router.put('/:cartID/:productID', function (req, res, next) {
    var cartID = req.params.cartID;
    var productID = req.params.productID;
    if (cartID === 'update') next();
    else {
        Cart.findOne({
                _id: cartID
            })
            .then(function (cart) {
                // Extract out to a function...when Aneury is ready
                var newCartContents = [];
                for (var i = 0; i < cart.contents.length; i++) {
                    var product = cart.contents[i].toString();
                    if (product !== productID) {
                        newCartContents.push(product);
                    }
                }
                cart.contents = newCartContents;
                cart.save()
                    .then(function (savedCart) {
                        res.json(savedCart);
                    });
            }).then(null, function (error) {
                next(error);
            });
    }
});

router.put('/update/:cartID', function (req, res, next) {
    var cartID = req.params.cartID;
    res.json(req.body);
    Cart.findOne({
            _id: cartID
        })
        .then(function (cart) {
            var newContents = [];
            req.body.updatedCartContents.forEach(function (uniqueProduct) {
                for (var i = 0; i < uniqueProduct.cartQuantity; i++) {
                    newContents.push(uniqueProduct._id);
                }
            });
            cart.contents = newContents;
            cart.save()
                .then(function (savedCart) {
                    res.json(savedCart);
                });
        }).then(null, function (error) {
            next(error);
        });
});
