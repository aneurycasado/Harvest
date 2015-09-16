app.controller('CartCtrl', function ($scope, $state, cart, CartService, OrderService) {
    $scope.cart = cart;
    $scope.uniqueProducts = [];
    $scope.editing = false;
    $scope.total = 0;
    $scope.goHome = function () {
        $state.go('home');
    };
    $scope.emptyCart = function () {
        $scope.uniqueProducts = [];
        $scope.updateCart();
        $scope.total = 0;
    };
    $scope.checkOut = function(user){
      var order = {
        user: user,
        items: $scope.uniqueProducts,
        orderTotal: $scope.total
      }
      OrderService.createOrder(user,order).then(function(savedOrder){
        $scope.emptyCart();
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
