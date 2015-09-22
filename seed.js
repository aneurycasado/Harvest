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
var numReviews = 1000;
var numProducts = 100;
var numOrders = 100;
var numPromos = 10;
var numFarms = 4;

var productImages = {
    'Fruits': ['https://s3-eu-west-1.amazonaws.com/infogram-particles-700/1218090389_1381145301.png', '/orange.jpg', 'https://cdn4.iconfinder.com/data/icons/X-Mac/education_icons/png/400/teachers_day.png'],
    'Vegetables': ['http://orig04.deviantart.net/f14f/f/2015/205/a/5/broccoli_by_reechiichka-d92pilw.png','http://orig13.deviantart.net/a5f6/f/2015/205/5/0/carrot_by_reechiichka-d92pim6.png','http://virtualplant.bio.nyu.edu/virtualplant2/images/maize.png'],
    'Dairy': ['https://41.media.tumblr.com/e10bcc29a0da33515186bce56cacaa84/tumblr_nki4exdohb1raso8wo2_400.png','https://pbs.twimg.com/profile_images/1347530743/Cheese2_400x400.PNG','/butter.gif']
};
var farmImages = ['https://stocklogos.com/sites/default/files/styles/logo-medium-alt/public/logos/image/1344889555-c37f8cb1e56675260d93a77c646ff183.png?itok=fRgtP4lH', 'https://stocklogos-pd.s3.amazonaws.com/styles/logo-medium-alt/logos/image/untitled-1_38.png?itok=_o0RnQlD', 'http://vectorlogofree.com/wp-content/uploads/2012/12/state-farm-logo-vector.png','http://www.fm95online.com/wishlist/2012/images/Farm-King-Logo.jpg'];
var emails = chance.unique(chance.email, numUsers);
var reviewContent = "Tell me why, I love you like I do. Tell me who, could stop my heart as much as you. Let's take each other's hand, as we jump into the final frontier. Mad about you baby, yeah, I'm mad about you. Whoo hoo hoo. I bet we been together for a million years, And I bet we'll be together for a million more. Oh, It's like I started breathing on the night we kissed, and I can't remember what I ever did before. What would we do baby, without us? What would we do baby, without us? And there ain't no nothing we can't love each other through. What would we do baby, without us? Sha la la la.";
var reviewTitle = ["barbecue sauce", "ale", "artificial sweetener", "chipotle peppers", "asparagus", "oatmeal", "heavy cream", "mackerel", "milk", "ice cream", "orange peels", "soy sauce", "salmon", "honey", "snap peas", "habanero chilies", "beer", "Tabasco sauce", "salsa", "geese", "catfish", "lemon Peel", "ketchup", "lemon grass", "aioli", "tea", "rabbits", "hot sauce", "pork", "horseradish", "tortillas", "brunoise", "Marsala", "graham crackers", "truffles", "pineapples", "quail", "coriander", "arugula", "lemon juice", "bok choy", "nectarines", "cabbage", "dumpling", "celery seeds", "red snapper", "broccoli", "liver", "yogurt", "Goji berry", "carrots", "spearmint", "buttermilk", "cactus", "bacon grease", "trout", "octopus", "garlic", "sweet peppers", "lemons", "bass", "breadfruit", "adobo", "baking powder", "chai", "chicory", "snapper", "clams", "pink beans", "ginger", "cheddar cheese", "brown sugar", "pinto beans", "bouillon", "tomato sauce", "ancho chile peppers", "sugar", "rose water", "jicama", "white beans", "tuna", "jelly beans", "provolone", "Irish cream liqueur", "Cappuccino Latte", "chile peppers", "basil", "ham", "chicken liver", "zest", "brazil nuts", "chestnuts", "water chestnuts", "cornstarch", "chicken", "chard", "pheasants", "almond extract", "date sugar", "tartar sauce"];
var productTitle = ["barbecue sauce", "ale", "artificial sweetener", "chipotle peppers", "asparagus", "oatmeal", "heavy cream", "mackerel", "milk", "ice cream", "orange peels", "soy sauce", "salmon", "honey", "snap peas", "habanero chilies", "beer", "Tabasco sauce", "salsa", "geese", "catfish", "lemon Peel", "ketchup", "lemon grass", "aioli", "tea", "rabbits", "hot sauce", "pork", "horseradish", "tortillas", "brunoise", "Marsala", "graham crackers", "truffles", "pineapples", "quail", "coriander", "arugula", "lemon juice", "bok choy", "nectarines", "cabbage", "dumpling", "celery seeds", "red snapper", "broccoli", "liver", "yogurt", "Goji berry", "carrots", "spearmint", "buttermilk", "cactus", "bacon grease", "trout", "octopus", "garlic", "sweet peppers", "lemons", "bass", "breadfruit", "adobo", "baking powder", "chai", "chicory", "snapper", "clams", "pink beans", "ginger", "cheddar cheese", "brown sugar", "pinto beans", "bouillon", "tomato sauce", "ancho chile peppers", "sugar", "rose water", "jicama", "white beans", "tuna", "jelly beans", "provolone", "Irish cream liqueur", "Cappuccino Latte", "chile peppers", "basil", "ham", "chicken liver", "zest", "brazil nuts", "chestnuts", "water chestnuts", "cornstarch", "chicken", "chard", "pheasants", "almond extract", "date sugar", "tartar sauce"];
var productDescription = "This is it, this is it. This is life, the one you get, so go and have a ball. This is it, this is it. Straight ahead, and rest assured you can't be sure at all. So while you're here enjoy the view, keep on doing what you do, so hold on tight we'll muddle through one day at a time, one day at a time. So up on your feet, up on your feet - somewhere there's music playing. Don't you worry none, we'll just take it like it comes, one day at a time, one day at a time. Making your way in the world today takes everything you've got. Taking a break from all your worries, sure would help a lot. Wouldn't you like to get away? Sometimes you want to go where everybody knows your name, and they're always glad you came. You wanna be where you can see, our troubles are all the same. You wanna be where everybody knows your name. You wanna go where people know, people are all the same, you wanna go where everybody knows your name.";
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
        var product = {
            title: chance.capitalize(productTitle[i]),
            description: productDescription[i],
            price: chance.integer({
                min: 1,
                max: 100
            }) - 0.01,
            inventoryQuantity: chance.integer({
                min: 0,
                max: 1000
            }),
            category: chance.last()
        };
        product.photo = productImages[product.category][chance.integer({min:0, max:2})];
        products.push(product);
        product = {};
    }
    return Product.createAsync(products);
};




function thumbsBool() {
    var x = chance.integer({
        min: 1,
        max: 10
    });
    if (x >= 5) return true;
    else return false;
}

var seedReviews = function (data) {
    var reviews = [];
    for (var i = 0; i < numReviews; i++) {
        reviews.push({
            author: data.users[chance.integer({
                min: 0,
                max: numUsers - 1
            })]._id,
            // author: data.users[0],
            product: data.products[chance.integer({
                min: 0,
                max: numProducts - 1
            })]._id,
            title: reviewTitle[i % 100],
            content: reviewContent,
            thumbsUp: thumbsBool()
        });
    }
    return Review.createAsync(reviews);
};

var seedPromos = function (data) {
    var promos = [];
    for (var i = 0; i < numPromos; i++) {
        var promo = {
            code: chance.natural({
                min: 10000,
                max: 99999
            }),
            description: chance.word(),
            discount: chance.floating({
                min: 0.01,
                max: 0.50,
                fixed: 2
            }),
            expiresOn: chance.date({
                year: 2016
            }),
            validCategories: chance.last()
        };
        promos.push(promo);
    }
    return Promo.createAsync(promos);
};

function executeSequentially(facts) {
    var result = Promise.resolve();
    facts.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
    });
    return result;
}

var seedOrders = function (data) {
    var orders = [];
    for (var i = 0; i < numOrders; i++) {
        var items = [];
        var numItems = chance.integer({
            min: 0,
            max: 4
        });
        var startItem = chance.integer({
            min: 0,
            max: numProducts - 6
        });
        var total = 0;
        for (var j = 0; j <= numItems; j++) {
            var currItem = data.products[startItem + j];
            items.push({
                id: currItem._id,
                title: currItem.title,
                description: currItem.description,
                category: currItem.category,
                photo: currItem.photo,
                price: currItem.price,
                cartQuantity: chance.integer({
                    min: 1,
                    max: 5
                })
            });
            total += currItem.price * items[j].cartQuantity;
        }
        orders.push({
            orderTotal: total,
            user: data.users[chance.integer({
                min: 0,
                max: numUsers - 1
            })]._id,
            items: items,
            shippingAddress: chance.address(),
            dateOfOrder: chance.date()
        });
    }
    return Order.createAsync(orders);
};

var seedFarms = function (data) {
    var farms = [];
    for (var i = 0; i < numFarms; i++) {
        var products = [];
        var numPro = 20;
        var startItem = (i + 1) * numPro;
        for (var j = 0; j < numPro; j++) {
            var currItem = data.products[startItem + j];
            products.push(currItem);
        }
        var userIndex = chance.integer({
            min: 0,
            max: numUsers
        });
        var user = data.users[userIndex];
        farms.push({
            products: products,
            user: user,
            photo: farmImages[i]
        });
    }
    return Farm.createAsync(farms);
};

var seedCarts = function (data) {
    var carts = [];
    for (var i = 0; i < numUsers; i++) {
        var numItems = chance.integer({
            min: 0,
            max: 4
        });
        var startItem = chance.integer({
            min: 0,
            max: numProducts - 6
        });
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


function popProductPercentageLikes(d) {
    d.products.forEach(function (prod) {
        d.reviews.forEach(function (rev) {
            if (prod._id === rev.product) {
                var liked = rev.thumbsUp ? 1 : 0;
                prod.percentageLiked =
                    (Math.round(prod.percentageLiked * prod.numReviews) + liked) / (prod.numReviews + 1);
                prod.numReviews = prod.numReviews + 1;
            }
        });
    });
    var promProds = [];
    d.products.forEach(function (prod) {
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
    }).then(function (carts) {
        return popProductPercentageLikes(data);
    }).then(function (prods) {
        return seedPromos();
    }).then(function () {
        return seedFarms(data);
    }).then(function (prods) {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
