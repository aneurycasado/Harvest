app.controller('CartCtrl', function ($scope, $state, cart, CartService, OrderService, ProductService) {
    console.log("Cart in cart controller ", cart);
    if(localStorage.getItem('cart')){
      $scope.cart = JSON.parse(localStorage.getItem('cart'));
      console.log($scope.cart);
    }else{
      $scope.cart = cart;
    }
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
        $scope.total = 0;
        if(localStorage.getItem('cart')){
          console.log("empty local Storage cart");
          console.dir("localStorage Cart ", JSON.parse(localStorage.getItem('cart')))
          $scope.cart.contents = [];
          localStorage.setItem('cart',JSON.stringify($scope.cart));
          CartService.getLocalCart();
        }else{
          $scope.updateCart();
        }
    };
    $scope.showCheckOut = function () {
        $scope.checkOutView = !$scope.checkOutView;
    };
    $scope.checkOut = function (user) {
        var shippingAddress = $scope.userInfo.address + " " + $scope.userInfo.address2 + " " + $scope.userInfo.city + " " + $scope.userInfo.state + " " + $scope.userInfo.zip;
        var order = {
            user: $scope.cart.user,
            items: $scope.uniqueProducts,
            orderTotal: $scope.total,
            shippingAddress: shippingAddress
        };
        // I think we have to .then off of this since it is async
        $scope.updateProducts();
        if($scope.cart.localStorage){
          console.log("Checkout on localStorage");
        }else{
          console.log("Checkout on user");
          OrderService.createOrder(user,order).then(function(savedOrder){
              $scope.emptyCart();
              $scope.checkOutView = false;
          });
        }
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
        if(localStorage.getItem('cart')){
          var newContents = [];
          var cart = JSON.parse(localStorage.getItem('cart'));
          cart.contents.forEach(
            function(currentProduct){
              if(currentProduct._id !== product._id) newContents.push(currentProduct);
            }
          );
          cart.contents = newContents;
          localStorage.setItem("cart", JSON.stringify(cart));
          CartService.getLocalCart();
          $state.reload();
        }else{
          CartService.removeFromCart(product, $scope.cart._id)
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
        CartService.updateCart($scope.uniqueProducts, $scope.cart)
            .then(function (updatedCart) {
                $scope.cart = updatedCart;
                $state.reload();
            });
    };
    $scope.finishedEditing = function () {
        $scope.editing = false;
    };
    $scope.countCart();
});
