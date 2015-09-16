app.controller('CartCtrl', function ($scope, $state, cart, CartService, OrderService, ProductService) {
    $scope.cart = cart;
    $scope.uniqueProducts = [];
    $scope.editing = false;
    $scope.total = 0;
    $scope.checkOutView = false;
    $scope.userInfo = {};
    $scope.goHome = function () {
        $state.go('home');
    };
    $scope.emptyCart = function () {
        $scope.uniqueProducts = [];
        $scope.updateCart();
        $scope.total = 0;
    };
    $scope.showCheckOut = function () {
        $scope.checkOutView = !$scope.checkOutView;
    };
    $scope.checkOut = function (user) {
        console.log($scope.cart);
        var shippingAddress = $scope.userInfo.address + " " + $scope.userInfo.address2 + " " + $scope.userInfo.city + " " + $scope.userInfo.state + " " + $scope.userInfo.zip
        var order = {
            user: $scope.cart.user,
            items: $scope.uniqueProducts,
            orderTotal: $scope.total,
            shippingAddress: shippingAddress
        };
        $scope.updateProducts();
        OrderService.createOrder(user,order).then(function(savedOrder){
            console.log(savedOrder);
            $scope.emptyCart();
            $scope.checkOutView = false;
        });
    };
    $scope.updateProducts = function(){
        $scope.uniqueProducts.forEach(function(product){
            product.inventoryQuantity -= product.cartQuantity;
            ProductService.updateProduct(product);
        });
    };
    $scope.countCart = function () {
        $scope.cart.contents.forEach(function (product) {
            var found = false;
            $scope.uniqueProducts.forEach(function (uniqueProduct) {
                if (product._id === uniqueProduct._id) {
                    $scope.total += uniqueProduct.price;
                    uniqueProduct.cartQuantity++;
                    found = true;
                }
            });
            if (!found) {
                product.cartQuantity = 1;
                $scope.total += product.price;
                $scope.uniqueProducts.push(product);
            }
        });
    };
    $scope.removeFromCart = function (product) {
        CartService.removeFromCart(product, $scope.cart._id)
            .then(function (updatedCart) {
                $scope.cart = updatedCart;
                $state.reload();
            });
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
        //console.log($scope.cart);
        CartService.updateCart($scope.uniqueProducts, $scope.cart)
            .then(function (updatedCart) {
                $scope.cart = updatedCart;
            });
    };
    $scope.finishedEditing = function () {
        $scope.editing = false;
    };
    $scope.countCart();
});
