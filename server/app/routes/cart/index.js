'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
module.exports = router;

router.get("/users/:userID", function (req, res, next) {
    Cart.findOne({
        user: req.params.userID
    }).populate('contents').then(function (cart) {
        res.json(cart);
    }).then(null, next);
});

router.post("/createCart/me", function(req,res,next){
  console.log("We are here");
  Cart.findOne({user:req.user.id})
  .then(function(cart){
    console.log(cart);
    req.body.cartExists = false;
    if(cart){
      console.log("The cart exist");
      req.body.cartExist = true;
      req.body.contents.forEach(function(product){
        cart.contents.push(product);
      })
      return cart.save();
    }else{
      return false;
    }
  })
  .then(function(savedCart){
    if(savedCart){
      console.log("It works");
      res.json(savedCart);
    }else{
      console.log("Wonder if it works");
      return Cart.create({user: req.user.id})
    }
  })
  .then(function(cart){
    cart.contents = req.body.contents;
    return cart.save()
  })
  .then(function(savedCart){
    console.log("Saved cart");
    res.json(savedCart);
  })
  .then(null,next);
});

router.put("/products/:productID", function (req, res, next) {
    var userID = req.user.id;
    var savedInfo = {};
    Product.findOne({_id: req.params.productID})
    .then(function (product) {
      savedInfo.product = product;
      return Cart.findOne({user: userID})
    })
    .then(function (cart) {
      if (cart){
        cart.contents.push(savedInfo.product._id);
        return cart.save();
      }else{
        Cart.create({user: userID})
        .then(function(newCart){
          newCart.contents.push(savedInfo.product._id);
          return newCart.save()
        });
      }
    })
    .then(function(savedCart){
      res.json(savedCart);
    })
    .then(null, next);
});

router.delete('/:cartID/products/:productID', function (req, res, next) {
    var cartID = req.params.cartID;
    var productID = req.params.productID;
    Cart.findOne({_id: cartID})
    .then(function (cart) {
      var newCartContents = [];
      for (var i = 0; i < cart.contents.length; i++) {
          var product = cart.contents[i].toString();
          if (product !== productID) {
              newCartContents.push(product);
          }
      }
      cart.contents = newCartContents;
      return cart.save()
    })
    .then(function (savedCart) {
      res.json(savedCart);
    })
    .then(null, next);
});

router.put('/update/:cartID', function (req, res, next) {
    var cartID = req.params.cartID;
    Cart.findOne({_id: cartID})
    .then(function(cart) {
      var newContents = [];
      req.body.updatedCartContents.forEach(function (uniqueProduct) {
        for (var i = 0; i < uniqueProduct.cartQuantity; i++) {
          newContents.push(uniqueProduct._id);
        }
      });
      cart.contents = newContents;
      return cart.save()
    })
    .then(function(savedCart) {
      res.json(savedCart);
    })
    .then(null, next);
});
