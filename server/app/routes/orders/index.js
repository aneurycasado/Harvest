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

function formatDates(date) {
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

var sendEmail = function (email, html) {
    console.log('sending email....', email);
    transporter.sendMail({
        from: 'harvestFSA@gmail.com',
        to: email.toString(),
        subject: 'Order Confirmed',
        html: html
    });
};


var createHeaderHTML = function(order){
  var head = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width"/><title>Modular Template Patterns</title><style type="text/css">body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}table{border-collapse:collapse;}img, a img{border:0; outline:none; text-decoration:none;}h1, h2, h3, h4, h5, h6{margin:0; padding:0;}p{margin: 1em 0;}.ReadMsgBody{width:100%;} .ExternalClass{width:100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;} table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} #outlook a{padding:0;}img{-ms-interpolation-mode: bicubic;}body, table, td, p, a, li, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}.flexibleContainerCell{padding-top:20px; padding-Right:20px; padding-Left:20px;}.flexibleImage{height:auto;}.bottomShim{padding-bottom:20px;}.imageContent, .imageContentLast{padding-bottom:20px;}.nestedContainerCell{padding-top:20px; padding-Right:20px; padding-Left:20px;}body, #bodyTable{background-color:#F5F5F5;}#bodyCell{padding-top:40px; padding-bottom:40px;}#emailBody{background-color:#FFFFFF; border:1px solid #DDDDDD; border-collapse:separate; border-radius:4px;}h1, h2, h3, h4, h5, h6{color:#202020; font-family:Helvetica; font-size:20px; line-height:125%; text-align:Left;}.textContent, .textContentLast{color:#404040; font-family:Helvetica; font-size:16px; line-height:125%; text-align:Left; padding-bottom:20px;}.textContent a, .textContentLast a{color:#2C9AB7; text-decoration:underline;}.nestedContainer{background-color:#E5E5E5; border:1px solid #CCCCCC;}.emailButton{background-color:#2C9AB7; border-collapse:separate; border-radius:4px;}.buttonContent{color:#FFFFFF; font-family:Helvetica; font-size:18px; font-weight:bold; line-height:100%; padding:15px; text-align:center;}.buttonContent a{color:#FFFFFF; display:block; text-decoration:none;}.emailCalendar{background-color:#FFFFFF; border:1px solid #CCCCCC;}.emailCalendarMonth{background-color:#2C9AB7; color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; padding-top:10px; padding-bottom:10px; text-align:center;}.emailCalendarDay{color:#2C9AB7; font-family:Helvetica, Arial, sans-serif; font-size:60px; font-weight:bold; line-height:100%; padding-top:20px; padding-bottom:20px; text-align:center;}@media only screen and (max-width: 480px){body{width:100% !important; min-width:100% !important;} table[id="emailBody"], table[class="flexibleContainer"]{width:100% !important;}img[class="flexibleImage"]{height:auto !important; width:100% !important;}table[class="emailButton"]{width:100% !important;}td[class="buttonContent"]{padding:0 !important;}td[class="buttonContent"] a{padding:15px !important;}td[class="textContentLast"], td[class="imageContentLast"]{padding-top:20px !important;}/*////// GENERAL STYLES //////*/td[id="bodyCell"]{padding-top:10px !important; padding-Right:10px !important; padding-Left:10px !important;}}</style></head>'
  var top = '<body><center><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"><tr><td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="600" id="emailBody"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer"><tr><td align="center" valign="top" width="600" class="flexibleContainerCell"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" class="textContent"><h3>Order Receipt #' + order._id + '</h3><br />Ordered on: ' + order.dateOfOrder +'</td></tr></table></td></tr></table></td></tr></table></td></tr>'
  return head + top;
}

var createProductHTML = function(order){
  var html = "";
  order.items.forEach(function(item){
    console.log("Photo ", item.photo);
    var productHTML = '<tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer"><tr><td align="center" valign="top" width="600" class="flexibleContainerCell bottomShim"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="nestedContainer"><tr><td valign="top" class="nestedContainerCell"><table align="Left" border="0" cellpadding="0" cellspacing="0" width="200" class="flexibleContainer"><tr><td align="Left" valign="top" class="imageContent"><img src=' + item.photo + 'width="200" class="flexibleImage" style="max-width:200px;" /></td></tr></table><table align="Right" border="0" cellpadding="0" cellspacing="0" width="280" class="flexibleContainer"><tr><td valign="top" class="textContent"><h4> Name: ' + item.title + '</h4><br /><h4> Price: ' + item.price + '</h4><br /><h4> Quantity Ordered: ' + item.cartQuantity + '</h4><br /><h4> Item Total: ' + (item.cartQuantity * item.price).toString() + '</h4></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr>'
    html+= "<br>" + productHTML;
  });
  return html;
}

var createFooterHTML = function(order){
  var bottom = '<body><center><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"><tr><td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="600" id="emailBody"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer"><tr><td align="center" valign="top" width="600" class="flexibleContainerCell"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" class="textContent"><h3>Order Total: $' + order.orderTotal  + '</h3></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></center></body></html>'
  return bottom;
}

var createHTML = function (order) {
    order.dateOfOrder = formatDates(order.dateOfOrder);
    var headerHTML = createHeaderHTML(order);
    var productHTML = createProductHTML(order);
    var footerHTML = createFooterHTML(order);
    return headerHTML + productHTML + footerHTML
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
                console.log(html)
                sendEmail(email, html);
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
                sendEmail(email, html);
                res.json(createdOrder);
            });
    }
});
