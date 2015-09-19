'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'harvestFSA@gmail.com',
        pass: 'harvest123'
    }
});
module.exports = router;

router.get("/", function (req, res, next) {
    Order.find().populate('user').exec()
        .then(function (orders) {
            res.send(orders);
        })
        .then(null, next);
});

router.get("/all/user", function (req, res, next) {
    Order.find({
            user: req.user._id
        }).exec()
        .then(function (userOrders) {
            res.send(userOrders);
        })
        .then(null, next);
});


router.get("/:id", function (req, res, next) {
    Order.findOne({
            _id: req.params.id
        }).exec()
        .then(function (order) {
            res.json(order);
        })
        .then(null, next);
});

router.put('/', function (req, res, next) {
    Order.findOne(req.body._id)
        .then(function (order) {
            for (var k in req.body) {
                order[k] = req.body[k];
            }
            return order.save();
        })
        .then(function (savedOrder) {
            res.json(savedOrder);
        })
        .then(null, next);
});

function formatDates (date) {
			var monthNames = [
				  "January", "February", "March",
				  "April", "May", "June", "July",
				  "August", "September", "October",
				  "November", "December"
			];
      var dateOfOrder = {};
			dateOfOrder = new Date(date);
			var day = dateOfOrder.getDate();
			var monthIndex = dateOfOrder.getMonth();
			var month = monthNames[monthIndex];
			var year = dateOfOrder.getFullYear();
			dateOfOrder.day = day;
			dateOfOrder.month = month;
			dateOfOrder.year = year;
      return dateOfOrder;
	}

var sendEmail = function (email,html) {
	console.log('sending email....',email);
    transporter.sendMail({
        from: 'harvestFSA@gmail.com',
        to: email.toString(),
        subject: 'Order Confirmed',
        html: html
    });
};

var createHTML = function(order){
  order.dateOfOrder = formatDates(order.dateOfOrder);
  return "<div class ='container'><h1>Order Receipt</h1><div class = 'panel panel-success'><div class = 'panel-heading'><h2>Ordered On: " + order.dateOfOrder.month + " " + order.dateOfOrder.day + ', ' + order.dateOfOrder.year + "</h2></div><div class = 'panel-body'><h2>Total: $" + order.orderTotal + "</h2></div></div></div>";
}

router.post("/:userID", function (req, res, next) {
    var email = req.body.email;
    delete req.body.email
    if (req.params.userID === 'guest' && !req.user) {
        console.log("Guest");
        User.create({
                'type': 'guest',
                'email': email
            })
            .then(function (createdUser) {
                console.log("CreatedUser ", createdUser);
                req.body.user = createdUser._id;
                return createdUser;
            })
            .then(function (user) {
                return Order.create(req.body);
            })
            .then(function (newOrder) {
                var html = createHTML(newOrder);
                sendEmail(email,html);
                res.json(newOrder);
            })
            .then(null, next);
    } else {
        if (req.params.userID === 'guest') {
            req.body.user = req.user._id;
        }
        Order.create(req.body)
            .then(function (createdOrder) {
              var html = createHTML(createdOrder);
              sendEmail(email,html);
              res.json(createdOrder);
            });
    }
});
