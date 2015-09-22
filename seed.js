/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var chance = require('chance')(123);
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));
var Promo = Promise.promisifyAll(mongoose.model('Promo'));
var Farm = Promise.promisifyAll(mongoose.model('Farm'));


var numUsers = 100;
var numReviews = 100;
var numProducts = 100;
var numOrders = 100;

var numPromos = 10;

var numFarms = 40;


var emails = chance.unique(chance.email, numUsers);
var reviewContent = chance.unique(chance.sentence, numReviews);
var reviewTitle = chance.unique(chance.word, numReviews);
var productTitle = chance.unique(chance.word, numProducts);
var productDescription = chance.unique(chance.sentence, numProducts);
// Creating a dummy set of categories
chance.set('lastNames', ['Dairy', 'Vegetables', 'Fruits']);

var seedUsers = function () {
    var users = [];
    emails.forEach(function (email) {
        users.push({
            email: email,
            password: chance.word(),
            name: chance.name()
        });
    });
    return User.createAsync(users);
};

var seedProducts = function () {
    var products = [];
    for (var i = 0; i < numProducts; i++) {
        products.push({
            title: productTitle[i],
            description: productDescription[i],
            price: chance.floating({min: 0.99, max: 1999.99, fixed: 2}),
            inventoryQuantity: chance.integer({min: 0, max: 10000}),
            category: chance.last()
        });
    }
    return Product.createAsync(products);
};




function thumbsBool(){
    var x = chance.integer({min:1, max: 10});
    if(x>=5) return true;
    else return false;
}

var seedReviews = function (data) {
    var reviews = [];
    for (var i = 0; i < numReviews; i++) {
        reviews.push({
            author: data.users[chance.integer({min: 0, max: numUsers-1})]._id,
            // author: data.users[0],
            product: data.products[chance.integer({min: 0, max: numProducts-1})]._id,
            title: reviewTitle[i],
            content: reviewContent[i],
            thumbsUp: thumbsBool()
        });
    }
    // Promise.map(reviews, function(review, index){
    //     console.log(index);
    //     return Review.createAsync(review);
    // })
    // .then(function(reviews){
    //     return reviews;
    // });

    // var promFacts = [];
    // reviews.forEach(function(review){
    //     promFacts.push(function(){
    //         return Review.createAsync(review);
    //     });
    // });

    // executeSequentially(promFacts)
    // .catch(function(err){
    //     console.log(err);
    // });

    // return reviews;

    // Promise.reduce(reviews, function(mem, review, index){
    //     console.log('index is ', index)
    //     return Review.createAsync(review)
    // }, null)
    // .then(function(rev){
    //     return reviews;
    // });

    return Review.createAsync(reviews);


};

var seedPromos = function (data) {
    var promos = [];
    for (var i = 0; i < numPromos; i++) {
        var promo = {
            code: chance.natural({min: 10000, max: 99999}),
            description: chance.word(),
            discount: chance.floating({min: 0.01, max: 0.50, fixed: 2}),
            expiresOn: chance.date({year: 2016}),
            validCategories: chance.last()
        };
        promos.push(promo);
    }
    return Promo.createAsync(promos);
};

function executeSequentially(facts){
    var result = Promise.resolve();
    facts.forEach(function(promiseFactory){
        result = result.then(promiseFactory);
    });
    return result;
}

var seedOrders = function (data) {
    var orders = [];
    for (var i = 0; i < numOrders; i++){
        var items = [];
        var numItems = chance.integer({min: 0, max: 4});
        var startItem = chance.integer({min: 0, max: numProducts-6});
        var total=0;
        for (var j = 0; j <= numItems; j++) {
            var currItem = data.products[startItem + j];
            items.push({
                id: currItem._id,
                title: currItem.title,
                description: currItem.description,
                category: currItem.category,
                photo: currItem.photo,
                price: currItem.price,
                cartQuantity: chance.integer({min: 1, max: 5})
            });
            total+=currItem.price*items[j].cartQuantity;
        }
        orders.push({
            orderTotal: total,
            user: data.users[chance.integer({min: 0, max: numUsers-1})]._id,
            items: items,
            shippingAddress: chance.address(),
            dateOfOrder: chance.date()
        });
    }
    return Order.createAsync(orders);
};

var seedFarms = function(data){
  var farms = [];
  for(var i = 0; i < numFarms; i++){
    var products = [];
    var numPro = chance.integer({min: 3, max: 30});
    var startItem = chance.integer({min: 0, max: numProducts-numPro});
    for(var j = 0; j < numPro; j++){
      var currItem = data.products[startItem + j];
      products.push(currItem);
    }
    var userIndex = chance.integer({min: 0, max: numUsers});
    var user = data.users[userIndex];
    farms.push({
      products: products,
      user: user
    })
  }
  return Farm.createAsync(farms);
}

var seedCarts = function (data) {
    var carts = [];
    for (var i = 0; i < numUsers; i++) {
        var numItems = chance.integer({min: 0, max: 4});
        var startItem = chance.integer({min: 0, max: numProducts-6});
        var contents = [];
        for (var j = 0; j <= numItems; j++) {
            var currItem = data.products[startItem + j];
            contents.push(currItem._id);
        }
        carts.push({
            user: data.users[i]._id,
            contents: contents
        });
    }
    return Cart.createAsync(carts);
};


function popProductPercentageLikes(d){
    d.products.forEach(function(prod){
        d.reviews.forEach(function(rev){
            if(prod._id===rev.product){
                var liked = rev.thumbsUp ? 1 : 0;
                prod.percentageLiked =
                (Math.round(prod.percentageLiked*prod.numReviews)+liked) / (prod.numReviews+1);
                prod.numReviews = prod.numReviews+1;
            }
        });
    });
    var promProds = [];
    d.products.forEach(function(prod){
        promProds.push(prod.save());
    });
    return Promise.all(promProds);
}

connectToDb.then(function () {
    var data = {};
    User.findAsync({}).then(function (users) {
        return seedUsers();
    }).then(function (users) {
        data.users = users;
        return seedProducts();
    }).then(function (products) {
        data.products = products;
        return seedReviews(data);
    }).then(function (reviews) {
        data.reviews = reviews;
        return seedOrders(data);
    }).then(function (orders) {
        return seedCarts(data);
    }).then(function (carts){
        return popProductPercentageLikes(data);
    }).then(function(prods) {
        return seedPromos();
    }).then(function(){
        return seedFarms(data);
    }).then(function (prods) {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
