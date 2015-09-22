app.controller('CartCtrl', function ($scope, $state, cart, promos, CartFactory, OrderFactory, ProductFactory, UserFactory, PromoFactory, $http) {
    $scope.showPromoCode = false;
    $scope.promoApplied = false;
    $scope.promos = promos;

    $scope.showPromoCodeForm = function () {
        $scope.showPromoCode = !$scope.showPromoCode;
    };

    $scope.validatePromoCode = function (promoCode) {

        PromoFactory.getOneByCode(promoCode.toString())
            .then(function (promo) {
                if (promo.length) {
                    $scope.promo = promo[0];
                    $scope.promoApplied = true;
                    $scope.countCart();
                }
            });
    };

    if (localStorage.getItem('cart')) {
        $scope.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        $scope.cart = cart;
    }
    $scope.uniqueProducts = [];
    $scope.editing = false;
    $scope.total = 0;
    $scope.totalDiscount = 0;
    $scope.checkOutView = false;
    $scope.userInfo = {};
    $scope.ordered = false;
    $scope.orderID = null;

    $scope.resetForm = function () {
        $scope.checkOutView = false;
        $scope.emailSubmitted = false;
    };

    $scope.emptyCart = function () {
        $scope.uniqueProducts = [];
        $scope.total = 0;
        if (localStorage.getItem('cart')) {
            $scope.cart.contents = [];
            localStorage.setItem('cart', JSON.stringify($scope.cart));
            CartFactory.getLocalCart();
            $scope.updateCart();
        } else {
            $scope.updateCart();
        }
    };
    $scope.showCheckOut = function () {
        $scope.checkOutView = !$scope.checkOutView;
    };
    $scope.checkOut = function (user) {
        console.log('on click', $scope.totalDiscount);
        Stripe.card.createToken($scope.card, function (err, response) {
            if (err && err.type === 'StripeCardError') {
                console.log(err);
                console.log("Invalid card");
            } else {
                if (response.error) {
                    alert(response.error.message);
                } else {
                    $scope.card.token = response.id;
                    $scope.card.amount = $scope.total;
                    $http.post('/pay', $scope.card)
                        .then(function (charge) {
                            console.log('after pay', $scope.totalDiscount);
                            var shippingAddress = $scope.userInfo.address + " " + $scope.userInfo.address2 + " " + $scope.userInfo.city + " " + $scope.userInfo.state + " " + $scope.userInfo.zip;
                            var order = {
                                user: $scope.cart.user,
                                items: $scope.uniqueProducts,
                                orderTotal: $scope.total,
                                shippingAddress: shippingAddress,
                                email: $scope.email,
                                promoCode: $scope.promoCode,
                                discountApplied: $scope.totalDiscount
                            };
                            $scope.updateProducts();
                            return OrderFactory.createOrder(user, order);
                        })
                        .then(function (savedOrder) {
                            $scope.ordered = true;
                            $scope.orderID = savedOrder._id;
                            $scope.checkOutView = false;
                            $scope.emptyCart();
                        });
                }
            }
        });
    };
    $scope.updateProducts = function () {
        $scope.uniqueProducts.forEach(function (product) {
            product.inventoryQuantity -= product.cartQuantity;
            ProductFactory.updateProduct(product);
        });
    };
    $scope.countCart = function () {
        $scope.total = 0;
        $scope.totalDiscount = 0;
        $scope.uniqueProducts = [];
        _.uniq($scope.cart.contents, '_id').forEach(product => {
            product.cartQuantity = _.where($scope.cart.contents, {
                _id: product._id
            }).length;
            $scope.uniqueProducts.push(product);
            $scope.total += product.price * product.cartQuantity;
            if ($scope.promo) {
                if (product.category === $scope.promo.validCategories) {
                    $scope.totalDiscount += ($scope.promo.discount * product.price * product.cartQuantity);
                }
            }
        });
    };
    $scope.removeFromCart = function (product) {
        if (localStorage.getItem('cart')) {
            var newContents = [];
            var cart = JSON.parse(localStorage.getItem('cart'));
            cart.contents.forEach(
                function (currentProduct) {
                    if (currentProduct._id !== product._id) newContents.push(currentProduct);
                }
            );
            cart.contents = newContents;
            localStorage.setItem("cart", JSON.stringify(cart));
            CartFactory.getLocalCart();
            $state.reload();
        } else {
            CartFactory.removeFromCart(product, $scope.cart._id)
                .then(
                    function (updatedCart) {
                        $scope.cart = updatedCart;
                        $state.reload();
                    }
                );
        }
    };
    $scope.increaseQuantity = function (product) {
        $scope.editing = true;
        product.cartQuantity++;
    };
    $scope.reduceQuantity = function (product) {
        $scope.editing = true;
        product.cartQuantity--;
    };
    $scope.updateCart = function () {
        if (localStorage.getItem('cart')) {
            var newContents = [];
            $scope.uniqueProducts.forEach(function (uniqueProduct) {
                for (var i = 0; i < uniqueProduct.cartQuantity; i++) {
                    newContents.push(uniqueProduct);
                }
            });
            $scope.cart.contents = newContents;
            localStorage.setItem('cart', JSON.stringify($scope.cart));
            CartFactory.getLocalCart();
            if ($scope.ordered) {
                $state.go("orderReceipt", {
                    id: $scope.orderID
                });
            } else {
                $state.reload();
            }
        } else {
            CartFactory.updateCart($scope.uniqueProducts, $scope.cart)
                .then(function (updatedCart) {
                    $scope.cart = updatedCart;
                    if ($scope.ordered) {
                        $state.go("orderReceipt", {
                            id: $scope.orderID
                        });
                    } else {
                        $state.reload();
                    }
                });
        }
    };
    $scope.finishedEditing = function () {
        $scope.editing = false;
    };
    $scope.countCart();
});
