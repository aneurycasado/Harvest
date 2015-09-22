var mongoose = require('mongoose');
var chance = require('chance')(123);

	var emails = ['steve@steve.com','ryan@ryan.com'];
	var reviewContent = ["one review's content", "another review's content"];
	var reviewTitle = ['review title 1', 'review title 2'];
	var productTitle = ['product title 1', 'product title 2'];
	var productDescription = ['product description 1', 'product description 2'];
	chance.set('lastNames', ['Dairy', 'Vegetables', 'Fruits']);

	var users = [];
	emails.forEach(function (email) {
	    users.push({
	        email: email,
	        password: chance.word(),
	        name: chance.name()
	    });
	});

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

    var reviews = [];
    for (var i = 0; i < numReviews; i++) {
        reviews.push({
            author: users[chance.integer({min: 0, max: numUsers-1})]._id,
            // author: data.users[0],
            product: products[chance.integer({min: 0, max: numProducts-1})]._id,
            title: reviewTitle[i],
            content: reviewContent[i],
            thumbsUp: thumbsBool()
        });
    }

    var orders = [];
    for (var i = 0; i < numOrders; i++){
        var items = [];
        var numItems = chance.integer({min: 0, max: 4});
        var startItem = chance.integer({min: 0, max: numProducts-6});
        var total=0;
        for (var j = 0; j <= numItems; j++) {
            var currItem = data.products[startItem + j];
            items.push({
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


    exports.module = createDummyMods;