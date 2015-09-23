'use strict';
var path = require('path');
var express = require('express');
var app = express();
var stripe = require("stripe")("sk_test_qt497RhBfXKBkxlBacp3tJ6Y");

module.exports = app;
// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);
// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));
/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }
});

app.get('/github', function (req, res, next) {
  res.redirect('https://github.com/aneurycasado/StackStore');
});

app.use("/pay", function(req,res,next){
  var stripeToken = req.body.token;
  var amount = Math.round(req.body.amount*100);
  delete req.body.amount;
  stripe.charges.create({
    amount: amount,
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }).then(function(charge){
    res.json(charge);
  });
});

app.get("/guestUser", function (req, res) {
    req.session.guestUser = true;
    res.redirect("/");
});

app.get('/*', function (req, res) {
    if (req.isAuthenticated() || req.session.guestUser) {

        res.sendFile(app.get('indexHTMLPath'));
    } else {

        res.sendFile(app.get('landingPageHTMLPath'));
    }
});

// Error catching endware.
app.use(function (err, req, res, next) {

    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
